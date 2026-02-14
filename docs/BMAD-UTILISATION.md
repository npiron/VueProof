# Utiliser BMAD dans ce projet

## État actuel

BMAD est déjà installé dans ce repo:

- Dossier BMAD: `_bmad/`
- Artefacts générés: `_bmad-output/`
- Module actif: `bmm`

Commande de vérification:

```bash
npx bmad-method status
```

## Workflow conseillé (rapide)

Si tu veux aller vite sur une feature:

1. `quick-spec`
2. `dev-story`
3. `code-review`

## Workflow complet (produit)

Pour un projet plus structuré:

1. `product-brief`
2. `create-prd`
3. `create-architecture`
4. `create-epics-and-stories`
5. `sprint-planning`
6. Boucle par story: `create-story` -> `dev-story` -> `code-review`

## Utilisation dans Copilot Chat (VS Code)

Selon les outils, les commandes slash BMAD (`/bmad-help`, etc.) peuvent ne pas être automatiquement exposées.

Dans ce cas, utilise ce format de prompt:

```text
Utilise le workflow BMAD "quick-spec".
Contexte projet: [décris ton besoin]
Référence: _bmad/bmm/workflows/bmad-quick-flow/quick-spec/workflow.md
Produis un tech spec prêt à implémenter avec stories.
```

Puis enchaîne:

```text
Utilise le workflow BMAD "dev-story" pour implémenter la story 1.
Référence: _bmad/bmm/workflows/4-implementation/dev-story/workflow.yaml
Respecte les critères d'acceptation et propose les tests.
```

## Prompts prêts à copier

### 1) Démarrer avec BMAD

```text
Agis comme BMAD Master.
Consulte _bmad/_config/bmad-help.csv pour proposer la meilleure prochaine étape.
Mon objectif: [objectif]
Contraintes: [contraintes]
```

### 2) Créer une PRD

```text
Utilise le workflow create-prd.
Référence: _bmad/bmm/workflows/2-plan-workflows/create-prd/workflow-create-prd.md
Contexte produit: [contexte]
Génère une PRD concise et exploitable.
```

### 3) Revue de code

```text
Utilise le workflow code-review.
Référence: _bmad/bmm/workflows/4-implementation/code-review/workflow.yaml
Scope: [fichiers ou feature]
Retour attendu: problèmes classés par sévérité + correctifs proposés.
```

## Commandes utiles

Installer ou mettre à jour BMAD:

```bash
npx bmad-method install --directory . --modules bmm
```

Installer avec langue française des agents/documents:

```bash
npx bmad-method install --directory . --modules bmm --communication-language French --document-output-language French
```

## Afficher les agents BMAD dans la liste GitHub

Si ton sélecteur d'agents lit uniquement `.github/agents`, synchronise les agents BMAD avec:

```bash
bash scripts/sync-bmad-github-agents.sh
```

Cela copie les agents depuis `_bmad/core/agents` et `_bmad/bmm/agents` vers `.github/agents` avec le format `bmad-*.agent.md`.

Après chaque update BMAD, relance simplement cette commande.
