from datetime import datetime, timezone
import time

import psutil
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="PulseBoard System Monitor")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

started_at = time.time()

@app.get("/api/health")
def health():
    return {"status": "online", "service": "PulseBoard Mac Monitor"}

@app.get("/api/metrics")
def get_metrics():
    cpu_percent = psutil.cpu_percent(interval=0.5)
    memory = psutil.virtual_memory()
    disk = psutil.disk_usage("/")
    network = psutil.net_io_counters()
    boot_time = psutil.boot_time()

    return {
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "hostname": psutil.users()[0].name if psutil.users() else "MacBook",
        "platform": "macOS",
        "cpu": {
            "usage_percent": cpu_percent,
            "logical_cores": psutil.cpu_count(logical=True),
            "physical_cores": psutil.cpu_count(logical=False),
        },
        "memory": {
            "total_bytes": memory.total,
            "used_bytes": memory.used,
            "available_bytes": memory.available,
            "usage_percent": memory.percent,
        },
        "disk": {
            "total_bytes": disk.total,
            "used_bytes": disk.used,
            "free_bytes": disk.free,
            "usage_percent": disk.percent,
        },
        "network": {
            "bytes_sent": network.bytes_sent,
            "bytes_received": network.bytes_recv,
        },
        "system": {
            "uptime_seconds": int(time.time() - boot_time),
            "process_count": len(psutil.pids()),
        },
    }
