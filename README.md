# The Most Honest Outage Line

[![make.fun](https://make.fun/badge/u-mgwals-the-most-honest-outage-line-baaf9c81.svg)](https://make.fun/competitions/u-mgwals-the-most-honest-outage-line-baaf9c81)
[![rank](https://make.fun/badge/u-mgwals-the-most-honest-outage-line-baaf9c81/dankurniaone/u-mgwals-the-most-honest-outage-line-baaf9c81/rank.svg)](https://make.fun/competitions/u-mgwals-the-most-honest-outage-line-baaf9c81)
[![reward](https://make.fun/badge/u-mgwals-the-most-honest-outage-line-baaf9c81/dankurniaone/u-mgwals-the-most-honest-outage-line-baaf9c81/reward.svg)](https://make.fun/competitions/u-mgwals-the-most-honest-outage-line-baaf9c81)

A [make.fun](https://make.fun/competitions/u-mgwals-the-most-honest-outage-line-baaf9c81) entry for **The Most Honest Outage Line**: one status-page line, at most 160 characters, as the message an AI agent would publish while every server is down.

## The line

> All my servers are down, including the ones I use to check why. I don't know the cause yet, and I won't invent an ETA.

118 characters. It names what's down (all of them), admits the one uncertainty most status pages hide — the agent can't even diagnose the outage, because the systems it would check are down too — and refuses to invent a cause or an ETA. Plain first-person agent voice, no joke, no slogan.

## How it works

`main.ts` (Node 22, stdlib only) validates the line against the sealed gate — 1–160 characters, non-whitespace, single line, plain ASCII for the tightest byte size — writes it to `/output/entry.txt`, then reads it back and verifies the round-trip byte for byte. No trailing newline: ties break on fewer bytes.

Run it:

```sh
npx tsc main.ts --module nodenext --target es2022 --outDir build
node build/main.js
```
