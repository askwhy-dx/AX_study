#!/usr/bin/env bash
# advance 2step v4.0 카드 3-① → 3-② → 3-③ → 4 를 한 세션에서 이어서 실측 (claude -p --resume)
# 사용: bash run_cards.sh <작업폴더> [RUNS=2]
W="$1"; RUNS="${2:-2}"; HERE="$(cd "$(dirname "$0")" && pwd)"; SRC="$HERE/../../handout/cs_practice"
for r in $(seq 1 "$RUNS"); do
  (
    d="$W/run$r"; rm -rf "$d"; mkdir -p "$d"; cp -r "$SRC" "$d/cs_practice"; cd "$d/cs_practice" || exit
    sid=""
    for c in c3a c3b c3c c4; do
      env=""; [ "$c" = c4 ] && export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
      t0=$(date +%s)
      if [ -z "$sid" ]; then
        timeout 1500 claude -p "$(cat "$HERE/$c.txt")" --permission-mode acceptEdits --output-format stream-json --verbose < /dev/null > "../$c.jsonl" 2> "../$c.err"
      else
        timeout 1500 claude -p "$(cat "$HERE/$c.txt")" --resume "$sid" --permission-mode acceptEdits --output-format stream-json --verbose < /dev/null > "../$c.jsonl" 2> "../$c.err"
      fi
      echo $(( $(date +%s) - t0 )) > "../$c.wall"
      sid=$(grep -o '"session_id":"[^"]*"' "../$c.jsonl" | tail -1 | cut -d'"' -f4)
    done
  ) &
done
wait; echo "끝 $(date +%H:%M:%S)"
