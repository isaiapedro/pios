from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from services import calendar_auth

router = APIRouter(prefix="/calendar/auth", tags=["calendar-auth"])


class AuthStartResponse(BaseModel):
    auth_url: str
    state: str
    instructions: str = (
        "Open auth_url in a browser on this machine/network, approve access, "
        "then POST /calendar/auth/wait/{state} to finish and store the token."
    )


class AuthWaitResponse(BaseModel):
    connected: bool
    expiry: str
    scopes: list[str]


@router.post("/start", response_model=AuthStartResponse)
async def start_auth() -> AuthStartResponse:
    auth_url, state = calendar_auth.build_auth_url()
    return AuthStartResponse(auth_url=auth_url, state=state)


@router.post("/wait/{state}", response_model=AuthWaitResponse)
async def wait_auth(state: str) -> AuthWaitResponse:
    try:
        result = await calendar_auth.wait_for_token(state)
    except TimeoutError as exc:
        raise HTTPException(status_code=408, detail=str(exc)) from exc
    except (ValueError, RuntimeError) as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    return AuthWaitResponse(connected=True, **result)
