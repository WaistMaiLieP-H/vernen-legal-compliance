import { SkillRegistry } from "../services/skill-registry.js";
import { authenticate } from "./middleware/auth.js";
import type { Env } from "../index.js";

type RouteParams = Record<string, string>;

const registry = new SkillRegistry();

/**
 * GET /api/skills — Full skill inventory across all Citizens
 */
export async function handleGetAllSkills(
  request: Request,
  env: Env
): Promise<Response> {
  const authResult = await authenticate(request, env);
  if (authResult) return authResult;

  const inventory = await registry.getFullInventory(env);

  // Build summary
  const summary: Record<string, { count: number; types: string[] }> = {};
  for (const [citizen, skills] of Object.entries(inventory)) {
    summary[citizen] = {
      count: skills.length,
      types: [...new Set(skills.map((s) => s.skillType))],
    };
  }

  return Response.json({
    totalSkills: Object.values(inventory).reduce((sum, s) => sum + s.length, 0),
    citizensWithSkills: Object.keys(inventory).length,
    summary,
    inventory,
  });
}

/**
 * GET /api/skills/:citizenName — Skills owned by a specific Citizen
 */
export async function handleGetCitizenSkills(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams
): Promise<Response> {
  const authResult = await authenticate(request, env);
  if (authResult) return authResult;

  const citizenName = (params["citizenName"] ?? "").toUpperCase();
  const skills = await registry.getSkillsForCitizen(citizenName, env);

  return Response.json({
    citizen: citizenName,
    skillCount: skills.length,
    skills: skills.map((s) => ({
      slug: s.skillSlug,
      name: s.name,
      type: s.skillType,
      description: s.description,
      standardsCount: s.governingStandards.length,
      triggersCount: s.auditTriggers.length,
      checklistCount: s.auditChecklist.length,
      version: s.version,
      installedAt: s.installedAt,
    })),
  });
}

/**
 * GET /api/skills/detail/:slug — Full detail of a specific skill
 */
export async function handleGetSkillDetail(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams
): Promise<Response> {
  const authResult = await authenticate(request, env);
  if (authResult) return authResult;

  const slug = params["slug"] ?? "";
  const skill = await registry.getSkill(slug, env);
  if (!skill) {
    return Response.json({ error: `Skill not found: ${slug}` }, { status: 404 });
  }

  return Response.json({ skill });
}

/**
 * POST /api/skills/install — Install a single skill from SKILL.md content
 * Body: { slug: string, content: string }
 */
export async function handleInstallSkill(
  request: Request,
  env: Env
): Promise<Response> {
  const authResult = await authenticate(request, env);
  if (authResult) return authResult;

  let body: { slug?: string; content?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.slug || !body.content) {
    return Response.json({ error: "Both 'slug' and 'content' are required" }, { status: 400 });
  }

  const skill = await registry.installSkill(body.slug, body.content, env);

  return Response.json({
    installed: true,
    skill: {
      id: skill.id,
      slug: skill.skillSlug,
      name: skill.name,
      citizen: skill.citizenName,
      type: skill.skillType,
      standardsCount: skill.governingStandards.length,
      triggersCount: skill.auditTriggers.length,
      checklistCount: skill.auditChecklist.length,
    },
  }, { status: 201 });
}

/**
 * POST /api/skills/install-batch — Install multiple skills
 * Body: { skills: Array<{ slug: string, content: string }> }
 */
export async function handleInstallBatch(
  request: Request,
  env: Env
): Promise<Response> {
  const authResult = await authenticate(request, env);
  if (authResult) return authResult;

  let body: { skills?: Array<{ slug: string; content: string }> };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.skills || !Array.isArray(body.skills)) {
    return Response.json({ error: "'skills' array is required" }, { status: 400 });
  }

  const result = await registry.installBatch(body.skills, env);

  return Response.json({
    installed: result.installed.length,
    errors: result.errors.length,
    manifest: result.installed.map((s) => ({
      slug: s.skillSlug,
      citizen: s.citizenName,
      type: s.skillType,
      name: s.name,
    })),
    errorDetails: result.errors,
  }, { status: 201 });
}

/**
 * POST /api/skills/match — Find skills matching a trigger/document type
 * Body: { trigger: string }
 */
export async function handleMatchSkill(
  request: Request,
  env: Env
): Promise<Response> {
  const authResult = await authenticate(request, env);
  if (authResult) return authResult;

  let body: { trigger?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.trigger) {
    return Response.json({ error: "'trigger' is required" }, { status: 400 });
  }

  const matches = await registry.findSkillByTrigger(body.trigger, env);

  return Response.json({
    trigger: body.trigger,
    matchCount: matches.length,
    matches: matches.map((s) => ({
      slug: s.skillSlug,
      citizen: s.citizenName,
      name: s.name,
      type: s.skillType,
      description: s.description,
    })),
  });
}

/**
 * GET /api/skills/executions/:citizenName — Execution history
 */
export async function handleGetExecutions(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams
): Promise<Response> {
  const authResult = await authenticate(request, env);
  if (authResult) return authResult;

  const citizenName = (params["citizenName"] ?? "").toUpperCase();
  const executions = await registry.getExecutionHistory({ citizenName, limit: 100 }, env);

  return Response.json({
    citizen: citizenName,
    executionCount: executions.length,
    executions,
  });
}
