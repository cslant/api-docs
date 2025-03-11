#!/bin/bash

set -a
# shellcheck disable=SC1091
source .env
set +a
set -ue

API_DOCS_DIR="$SOURCE_DIR/$PROJECT_NAME"
repo_sync_template() {
  REPO_NAME="$1"
  REPO_DIR="${2:-}"
  GIT_REPO_URL="${3:-}"
  REPO_PATH="${4:-}"

  if [ -z "$REPO_DIR" ]; then
    REPO_DIR="$REPO_NAME"
  fi

  echo "» Syncing $REPO_NAME repository..."

  if [ -n "$REPO_PATH" ]; then
    ATTACH_DIR="$REPO_PATH"
  else
    ATTACH_DIR="$SOURCE_DIR"
  fi
  cd "$ATTACH_DIR" || exit

  if [ -z "$(ls -A "$REPO_DIR")" ]; then
    echo "  ∟ Cloning $REPO_NAME repository..."

    if [ -z "$GIT_REPO_URL" ]; then
      git clone "$GIT_SSH_URL/$REPO_NAME.git" "$REPO_DIR"
    else
      git clone "$GIT_REPO_URL" "$REPO_DIR"
    fi
  else
    echo "  ∟ Pulling $REPO_NAME repository..."
    cd "$ATTACH_DIR/$REPO_DIR" || exit

    git checkout main -f
    git pull
  fi
  echo ''
}

git_sync() {
    repo_sync_template $PROJECT_NAME
}

build() {
  echo '⚙ Building API Docs...'

  BUILD_TYPE="$1"

  cd "$API_DOCS_DIR" || exit

  if [ ! -f "$API_DOCS_DIR/.env" ]; then
    echo '  ∟ .env file missing, copying from .env.example...'
    cp "$API_DOCS_DIR/.env.example" "$API_DOCS_DIR/.env"
  fi

  if ! command -v nvm &> /dev/null; then
    # shellcheck disable=SC2155
    export NVM_DIR="$HOME/.nvm"
    # shellcheck disable=SC1091
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
  fi
  nvm use "$NODE_VERSION"

  if ! command -v yarn &> /dev/null; then
    echo '  ∟ Installing yarn...'
    npm install -g yarn
  fi

  if [ ! -d "$API_DOCS_DIR/node_modules" ] || [ "$BUILD_TYPE" = "install" ]; then
    echo '  ∟ Installing dependencies...'
    if [ "$INSTALLER" = "yarn" ]; then
      yarn install

      yarn docusaurus clean-api-docs all
      yarn docusaurus gen-api-docs all
    else
      npm install
    fi
  else
    echo '  ∟ Updating dependencies...'
    if [ "$INSTALLER" = "yarn" ]; then
      yarn upgrade
    else
      npm update
    fi
  fi

  echo '  ∟ INSTALLER build...'
  if [ "$ENV" = "prod" ]; then
    node_runner build
  else
    node_runner dev
  fi
  echo ''
}

node_runner() {
  echo '🏃‍♂️ Running node...'

  cd "$API_DOCS_DIR" || exit

  if [ "$INSTALLER" = "yarn" ]; then
    yarn "$@"
  else
    npm run "$@"
  fi
  echo ''
}

worker() {
  echo '📽 Starting worker...'

  cd "$API_DOCS_DIR" || exit

  if pm2 show "$WORKER_NAME" > /dev/null; then
    echo "  ∟ Restarting $WORKER_NAME..."
    pm2 reload ecosystem.config.cjs
  else
    echo "  ∟ Starting $WORKER_NAME..."

    pm2 start ecosystem.config.cjs
    pm2 save
  fi
  echo ''
}

case "$1" in
  all | a)
    git_sync all
    build install
    worker
    ;;

  *)
    exit 1
    ;;
esac
