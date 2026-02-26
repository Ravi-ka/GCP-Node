# GitHub → Cloud Build → Cloud Functions (Gen2)

This repo is a monorepo. Recommended setup is **one Cloud Build trigger per function**, each filtered to a folder.

## 1) Connect GitHub repo

GCP Console → **Cloud Build** → **Triggers** → **Connect repository** → choose GitHub and select this repo.

## 2) Create triggers

### HTTP function (order-service)

- Trigger name: `deploy-createOrder`
- Event: Push to a branch (e.g. `main`)
- Build config: `cloudbuild/functions-http.yaml`
- Included files filter: `order-service/**`

### Pub/Sub function (payment-service)

- Trigger name: `deploy-processPayment`
- Event: Push to a branch (e.g. `main`)
- Build config: `cloudbuild/functions-pubsub.yaml`
- Included files filter: `payment-service/**`

## 3) Permissions

Grant the Cloud Build service account permission to deploy Gen2 functions.

Cloud Build SA:
- `${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com`

Common roles:
- `roles/cloudfunctions.developer`
- `roles/run.admin`
- `roles/artifactregistry.writer`
- `roles/iam.serviceAccountUser`

## 4) Customizing deployments

Both build configs use Cloud Build substitutions.

- `functions-http.yaml`: `_FUNCTION_NAME`, `_REGION`, `_SOURCE_DIR`, `_ENTRY_POINT`, `_RUNTIME`
- `functions-pubsub.yaml`: same, plus `_TOPIC`

In the trigger UI you can override substitutions if you want different names/regions.
