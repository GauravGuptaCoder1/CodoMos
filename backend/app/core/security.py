from datetime import datetime, timedelta, timezone
from typing import Optional
import hashlib
import base64
from jose import jwt
from passlib.context import CryptContext
from app.core.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    # Bcrypt has a 72-byte limit, use SHA256 for longer passwords
    password_bytes = plain_password.encode('utf-8')
    if len(password_bytes) > 72:
        # Hash the password and encode in base64 to stay under 72 bytes
        password_hash = hashlib.sha256(password_bytes).digest()
        plain_password = base64.b64encode(password_hash).decode('ascii')
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    # Bcrypt has a 72-byte limit, use SHA256 for longer passwords
    password_bytes = password.encode('utf-8')
    if len(password_bytes) > 72:
        # Hash the password and encode in base64 to stay under 72 bytes
        password_hash = hashlib.sha256(password_bytes).digest()
        password = base64.b64encode(password_hash).decode('ascii')
    return pwd_context.hash(password)


def create_access_token(subject: str, expires_minutes: Optional[int] = None) -> str:
    expire = datetime.now(timezone.utc) + timedelta(
        minutes=expires_minutes or settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )
    to_encode = {"exp": expire, "sub": str(subject)}
    return jwt.encode(to_encode, settings.JWT_SECRET_KEY, algorithm=settings.ALGORITHM)
