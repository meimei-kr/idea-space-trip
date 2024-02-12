# syntax = docker/dockerfile:1

# Rubyのバージョンを指定
ARG RUBY_VERSION=3.2.2
FROM ruby:$RUBY_VERSION-slim as base

# アプリケーションのラベル設定
LABEL fly_launch_runtime="rails"

# アプリケーションの作業ディレクトリを設定
WORKDIR /rails

# 環境変数の設定
ENV BUNDLE_DEPLOYMENT="1" \
    BUNDLE_PATH="/usr/local/bundle" \
    BUNDLE_WITHOUT="development:test" \
    RAILS_ENV="production"\
    RUBY_YJIT_ENABLE=1\
    LD_PRELOAD=/usr/lib/x86_64-linux-gnu/libjemalloc.so.2\
    MALLOC_CONF=dirty_decay_ms:1000,narenas:2,background_thread:true

# RubyとBundlerの更新
RUN gem update --system --no-document && \
    gem install -N bundler


# 最終イメージのサイズを削減するための一時的なビルドステージ
FROM base as build

# ビルドに必要なパッケージをインストール
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential default-libmysqlclient-dev

# GemfileとGemfile.lockをコピーして依存関係をインストール
COPY --link Gemfile Gemfile.lock ./
RUN bundle install && \
    bundle exec bootsnap precompile --gemfile && \
    rm -rf ~/.bundle/ "${BUNDLE_PATH}"/ruby/*/cache "${BUNDLE_PATH}"/ruby/*/bundler/gems/*/.git

# アプリケーションのコードをコピー
COPY --link . .

# bootsnapでアプリケーションのブート時間を短縮
RUN bundle exec bootsnap precompile app/ lib/


# 最終的なアプリケーションイメージの作成ステージ
FROM base

# デプロイに必要なパッケージをインストール
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y libjemalloc2 curl default-mysql-client openssl ca-certificates && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# ビルド段階で作成されたアーティファクト（gems, アプリケーションコード）をコピー
COPY --from=build "${BUNDLE_PATH}" "${BUNDLE_PATH}"
COPY --from=build /rails /rails

# セキュリティのため非rootユーザーで実行
RUN groupadd --system --gid 1000 rails && \
    useradd rails --uid 1000 --gid 1000 --create-home --shell /bin/bash && \
    chown -R 1000:1000 db log storage tmp
USER 1000:1000

# コンテナ起動時にdocker-entrypointを実行
ENTRYPOINT ["/rails/bin/docker-entrypoint"]

# コンテナの3000番ポートを開放
EXPOSE 3000

# コンテナ起動時のデフォルトコマンドを設定
CMD ["./bin/rails", "server"]
