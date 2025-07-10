import os

def create_file(path):
    """Create an empty file at the specified path if it doesn't exist."""
    os.makedirs(os.path.dirname(path), exist_ok=True)
    if not os.path.exists(path):
        with open(path, 'w') as f:
            pass

def create_project_structure():
    """Generate the folder and file structure for threads-social-network."""
    base_dir = "threads-social-network"

    # Project root files
    root_files = [
        ".env.example",
        ".gitignore",
        "go.mod",
        "go.sum",
        "Dockerfile",
        "Makefile"
    ]
    for file in root_files:
        create_file(os.path.join(base_dir, file))

    # cmd/
    create_file(os.path.join(base_dir, "cmd/server/main.go"))

    # internal/config/
    config_files = [
        "config.go",
        "database.go",
        "aws.go",
        "smtp.go",
        "app.go"
    ]
    for file in config_files:
        create_file(os.path.join(base_dir, "internal/config", file))

    # internal/models/
    model_files = [
        "user.go",
        "post.go",
        "comment.go",
        "like.go",
        "follow.go",
        "message.go",
        "notification.go",
        "report.go",
        "analytics.go",
        "audit.go"
    ]
    for file in model_files:
        create_file(os.path.join(base_dir, "internal/models", file))

    # internal/handlers/
    handler_files = [
        "auth.go",
        "user.go",
        "post.go",
        "comment.go",
        "like.go",
        "follow.go",
        "message.go",
        "search.go",
        "notification.go",
        "upload.go"
    ]
    for file in handler_files:
        create_file(os.path.join(base_dir, "internal/handlers", file))

    # internal/handlers/admin/
    admin_handler_files = [
        "analytics.go",
        "users.go",
        "posts.go",
        "reports.go",
        "settings.go"
    ]
    for file in admin_handler_files:
        create_file(os.path.join(base_dir, "internal/handlers/admin", file))

    # internal/middleware/
    middleware_files = [
        "auth.go",
        "admin.go",
        "cors.go",
        "rate_limit.go",
        "logging.go",
        "validation.go",
        "csrf.go"
    ]
    for file in middleware_files:
        create_file(os.path.join(base_dir, "internal/middleware", file))

    # internal/services/
    service_files = [
        "auth.go",
        "user.go",
        "post.go",
        "comment.go",
        "like.go",
        "follow.go",
        "message.go",
        "search.go",
        "notification.go",
        "email.go",
        "upload.go",
        "analytics.go",
        "moderation.go",
        "cache.go"
    ]
    for file in service_files:
        create_file(os.path.join(base_dir, "internal/services", file))

    # internal/repository/
    repository_files = [
        "user.go",
        "post.go",
        "comment.go",
        "like.go",
        "follow.go",
        "message.go",
        "search.go",
        "notification.go",
        "report.go",
        "analytics.go",
        "audit.go"
    ]
    for file in repository_files:
        create_file(os.path.join(base_dir, "internal/repository", file))

    # internal/routes/
    route_files = [
        "api.go",
        "auth.go",
        "user.go",
        "post.go",
        "social.go",
        "message.go",
        "search.go",
        "notification.go",
        "health.go",
        "admin.go"
    ]
    for file in route_files:
        create_file(os.path.join(base_dir, "internal/routes", file))

    # internal/utils/
    utils_files = [
        "jwt.go",
        "password.go",
        "validation.go",
        "pagination.go",
        "response.go",
        "upload.go",
        "email.go",
        "i18n.go"
    ]
    for file in utils_files:
        create_file(os.path.join(base_dir, "internal/utils", file))

    # internal/database/
    create_file(os.path.join(base_dir, "internal/database/connection.go"))
    
    # internal/database/migrations/
    migration_files = [
        "create_indexes.go",
        "seed_data.go"
    ]
    for file in migration_files:
        create_file(os.path.join(base_dir, "internal/database/migrations", file))

    # internal/database/queries/
    query_files = [
        "aggregations.go",
        "analytics.go"
    ]
    for file in query_files:
        create_file(os.path.join(base_dir, "internal/database/queries", file))

    # internal/monitoring/
    monitoring_files = [
        "metrics.go",
        "health.go"
    ]
    for file in monitoring_files:
        create_file(os.path.join(base_dir, "internal/monitoring", file))

    # internal/workers/
    worker_files = [
        "notification_worker.go",
        "analytics_worker.go",
        "message_worker.go"
    ]
    for file in worker_files:
        create_file(os.path.join(base_dir, "internal/workers", file))

    # pkg/logger/
    create_file(os.path.join(base_dir, "pkg/logger/logger.go"))

    # pkg/errors/
    create_file(os.path.join(base_dir, "pkg/errors/errors.go"))

    # pkg/constants/
    create_file(os.path.join(base_dir, "pkg/constants/constants.go"))

    # pkg/monitoring/
    create_file(os.path.join(base_dir, "pkg/monitoring/monitoring.go"))

    # pkg/i18n/
    create_file(os.path.join(base_dir, "pkg/i18n/i18n.go"))

    # api/swagger/
    swagger_files = [
        "docs.go",
        "swagger.json",
        "swagger.yaml"
    ]
    for file in swagger_files:
        create_file(os.path.join(base_dir, "api/swagger", file))

    # scripts/
    script_files = [
        "build.sh",
        "run.sh",
        "deploy.sh",
        "backup.sh"
    ]
    for file in script_files:
        create_file(os.path.join(base_dir, "scripts", file))

    # configs/
    config_files = [
        "config.yaml",
        "config.dev.yaml",
        "config.prod.yaml",
        "docker-compose.yml"
    ]
    for file in config_files:
        create_file(os.path.join(base_dir, "configs", file))

    print(f"Project structure created successfully under {base_dir}/")

if __name__ == "__main__":
    create_project_structure()