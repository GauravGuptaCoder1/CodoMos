from typing import Sequence
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie

from app.core.config import settings
from app.models import (
    User,
    Candidate,
    JobRole,
    Repo,
    Project,
    Form,
    FormResponse,
    Task,
    XPEvent,
    XPConfiguration,
    AppSettings,
    RepositoryMetadata,
    Branch,
    Commit,
    Issue,
    PullRequest,
    Contributor,
    Release,
    Milestone,
    ProjectBoard,
    Activity,
    XPLeaderboard,
)

_client: AsyncIOMotorClient | None = None


async def init_mongo() -> None:
    global _client
    _client = AsyncIOMotorClient(
        settings.MONGODB_URI,
        serverSelectionTimeoutMS=10000,
        connectTimeoutMS=10000,
        socketTimeoutMS=10000
    )
    db = _client[settings.MONGODB_DB]
    
    # Test connection
    await _client.admin.command('ping')
    print("✓ MongoDB connected successfully")
    
    await init_beanie(
        database=db,
        document_models=[
            User,
            Candidate,
            JobRole,
            Repo,
            Project,
            Form,
            FormResponse,
            Task,
            XPEvent,
            XPConfiguration,
            AppSettings,
            RepositoryMetadata,
            Branch,
            Commit,
            Issue,
            PullRequest,
            Contributor,
            Release,
            Milestone,
            ProjectBoard,
            Activity,
            XPLeaderboard,
        ],
    )
    print("✓ Beanie initialized successfully")


def get_client() -> AsyncIOMotorClient:
    assert _client is not None, "Mongo client not initialized"
    return _client
