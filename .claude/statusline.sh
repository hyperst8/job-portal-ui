#!/usr/bin/env bash
# Claude Code statusline: model name + context usage progress bar
# Lives in the project repo: .claude/statusline.sh

input=$(cat)

model=$(echo "$input" | grep -oE '"display_name"[[:space:]]*:[[:space:]]*"[^"]*"' | head -1 | sed -E 's/.*:[[:space:]]*"([^"]*)"/\1/')
[ -z "$model" ] && model="unknown"

used=$(echo "$input" | grep -oE '"used_percentage"[[:space:]]*:[[:space:]]*[0-9.]+' | head -1 | sed -E 's/.*:[[:space:]]*//')

# Colors (dimmed, terminal-friendly)
DIM='\033[2m'
RESET='\033[0m'
CYAN='\033[2;36m'
GREEN='\033[2;32m'
YELLOW='\033[2;33m'
RED='\033[2;31m'

bar_width=20

if [ -n "$used" ]; then
  used_int=$(printf '%.0f' "$used")
  [ "$used_int" -lt 0 ] && used_int=0
  [ "$used_int" -gt 100 ] && used_int=100

  filled=$(( used_int * bar_width / 100 ))
  empty=$(( bar_width - filled ))

  if [ "$used_int" -lt 50 ]; then
    color="$GREEN"
  elif [ "$used_int" -lt 80 ]; then
    color="$YELLOW"
  else
    color="$RED"
  fi

  bar=$(printf "%${filled}s" | tr ' ' '#')
  gap=$(printf "%${empty}s" | tr ' ' '-')

  printf "${CYAN}%s${RESET} ${DIM}|${RESET} ${color}[%s%s]${RESET} ${DIM}%s%%${RESET}\n" \
    "$model" "$bar" "$gap" "$used_int"
else
  printf "${CYAN}%s${RESET} ${DIM}| [--------------------] n/a${RESET}\n" "$model"
fi
