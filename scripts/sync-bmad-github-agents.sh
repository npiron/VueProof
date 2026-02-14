#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
AGENTS_DIR="$ROOT_DIR/.github/agents"

mkdir -p "$AGENTS_DIR"

mapfile -t BMAD_AGENT_FILES < <(find \
  "$ROOT_DIR/_bmad/core/agents" \
  "$ROOT_DIR/_bmad/bmm/agents" \
  -type f -name '*.md' | sort)

if [[ ${#BMAD_AGENT_FILES[@]} -eq 0 ]]; then
  echo "Aucun agent BMAD trouvé dans _bmad."
  exit 1
fi

copied_count=0
for source_file in "${BMAD_AGENT_FILES[@]}"; do
  base_name="$(basename "$source_file" .md)"
  target_file="$AGENTS_DIR/bmad-${base_name}.agent.md"
  source_rel="${source_file#$ROOT_DIR/}"

  {
    echo '```chatagent'
    echo '---'
    echo "name: bmad-${base_name}"
    echo "description: Agent BMAD synchronisé depuis ${source_rel}."
    echo '---'
    echo
    echo "Source BMAD: ${source_rel}"
    echo
    cat "$source_file"
    echo
    echo '```'
  } > "$target_file"

  copied_count=$((copied_count + 1))
  echo "Sync: ${source_file#$ROOT_DIR/} -> ${target_file#$ROOT_DIR/}"
done

echo "Terminé: $copied_count agent(s) BMAD synchronisé(s) dans .github/agents"
