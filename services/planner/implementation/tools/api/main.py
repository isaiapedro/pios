import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import engine
from routers import calendar_auth, dashboard, events, goals, insights, memos, planning, routine, schedule, sync

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s %(message)s",
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield

    await engine.dispose()


app = FastAPI(
    title="PIOS API",
    description="Personal Intelligence Operating System — backend API",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten in production
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(memos.router)
app.include_router(events.router)
app.include_router(schedule.router)
app.include_router(routine.router)
app.include_router(planning.router)
app.include_router(goals.router)
app.include_router(dashboard.router)
app.include_router(insights.router)
app.include_router(sync.router)
app.include_router(calendar_auth.router)


@app.get("/health")
async def health():
    return {"status": "ok"}
