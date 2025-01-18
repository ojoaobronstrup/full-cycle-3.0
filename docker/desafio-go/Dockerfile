FROM golang:1.22.11-alpine AS go-builder

COPY . /app

WORKDIR /app

RUN go build main.go

FROM alpine:3.6.5

WORKDIR /app

COPY --from=go-builder /app/main /app

ENTRYPOINT ["./main"]
