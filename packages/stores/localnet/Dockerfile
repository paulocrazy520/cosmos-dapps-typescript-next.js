FROM ubuntu as config

RUN apt-get update && apt-get install -y git
RUN git clone https://github.com/Ollo-labs/LocalOllo.git
RUN mkdir -p /Ollo/.ollod/config && \
  mv ./LocalOllo/config /Ollo/.ollod/ && \
  mkdir -p /Ollo/.ollod/data && \
  mv ./LocalOllo/data /Ollo/.ollod/ && \
  mv ./LocalOllo/priv_validator_state.json /Ollo/.ollod/data

#enable swagger
RUN sed -i 's/swagger = false/swagger = true/g' /Ollo/.ollod/config/app.toml

# use debug version for utils, like sh
#FROM osmolabs/Ollo-dev:v9.0.0-debug
FROM osmolabs/Ollo:9.0.0

COPY --from=config /Ollo/.ollod/config /Ollo/.ollod/config
COPY --from=config /Ollo/.ollod/data /Ollo/.ollod/data
