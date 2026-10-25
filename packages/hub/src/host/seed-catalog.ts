/**
 * 预置实用插件目录（seed catalog）—— 随包发布的一份**离线插件清单**。
 *
 * ── 为什么需要它 ────────────────────────────────────────────────────────────
 * 商店的内容正常情况下来自 GitHub 镜像同步（492 个仓库、几百次请求、几分钟）。
 * 新装 hub 的用户在"同步完成之前"看到的是一片空白 —— 体验上像是商店坏了。
 * 这份目录把一批**公认实用、覆盖各个场景**的插件直接写进包里，安装后立刻
 * 出现在商店里（无需联网、无需等待），同步完成后真实元数据会覆盖它。
 *
 * ── 写入规则（重要）─────────────────────────────────────────────────────────
 * 预置行是"真的插件行"（走的是和镜像同步同一张表、同一个 upsert），因此
 * 详情、安装、健康度、依赖图、更新检测对它全都照常工作。但：
 *   - **只插不覆盖**：若某个包已经由真实同步写入过，预置不会动它；
 *   - 预置行自己带版本号（`seed:<catalog 版本>`），目录升级时会刷新自己的行；
 *   - 名字集合存在 `meta.seed_catalog_names`，供 UI 打「预置」标记。
 *
 * 目录版本用日期，改内容时同步改它，旧安装会在下次启动自动刷新。
 */
import type { StoreDB, PluginRow } from './store-db.js';

/** 目录版本（改内容必须改它）。 */
export const SEED_CATALOG_VERSION = '2026-09-11.1';

/** meta 表里的键。 */
const META_VERSION = 'seed_catalog_version';
const META_NAMES = 'seed_catalog_names';

/** 一条预置条目：全部字段都来自真实仓库（packageName / repoFullName 必须准确）。 */
export interface SeedPlugin {
  packageName: string;
  repoFullName: string;
  name: string;
  shortDescription: string;
  categories: string[];
  version: string;
  stars: number;
  license: string;
  /** 为什么值得预置（一句话，给中文 UI 用）。 */
  reason: string;
}

/**
 * 预置清单：16 个，覆盖「视觉 / 界面 / 记忆 / 通知 / 成本 / 开发」六类常见需求。
 * 都是生态里星标高、维护活跃的插件，不是随便凑数。
 */
export const SEED_PLUGINS: readonly SeedPlugin[] = [
  {
    packageName: '@liustack/modlens',
    repoFullName: 'liustack/modlens',
    name: 'ModLens',
    shortDescription: '多模态工具集：读图、视觉理解、截图分析，让模型真正"看得见"。',
    categories: ['tool', 'agent', 'vision', 'dev'],
    version: '3.17.2',
    stars: 2119,
    license: 'MIT',
    reason: '生态里星标最高的能力型插件之一，补上视觉这块短板。',
  },
  {
    packageName: 'dsh-better-sidebar',
    repoFullName: 'omdsh-dev/DSH-better-sidebar',
    name: 'Better Sidebar',
    shortDescription: '更顺手的侧边栏：文件树、快捷入口与多面板布局一次到位。',
    categories: ['ui', 'dev'],
    version: '0.12.2',
    stars: 1435,
    license: 'MIT',
    reason: '界面类里最受欢迎的一个，装上立刻有感知。',
  },
  {
    packageName: '@deepseek-harness-tui/dsh-tui',
    repoFullName: 'ccch1mneyyy/dsh-TUI',
    name: 'DSH TUI',
    shortDescription: '终端界面：不开浏览器也能用完整 harness，长跑任务更省资源。',
    categories: ['agent', 'ui', 'dev'],
    version: '0.7.1',
    stars: 1404,
    license: 'MIT',
    reason: '第二条使用路径（终端），很多人就是因为这个留下来的。',
  },
  {
    packageName: '@anionex/dsh-vision-toolkit',
    repoFullName: 'Anionex/dsh-vision-toolkit',
    name: 'Vision Toolkit',
    shortDescription: '视觉工具箱：图片裁剪缩放、OCR、目标定位等常用图像操作。',
    categories: ['tool', 'agent', 'ui', 'vision', 'dev'],
    version: '0.1.8',
    stars: 476,
    license: 'MIT',
    reason: '和 ModLens 互补：一个负责"看懂"，它负责"处理"。',
  },
  {
    packageName: '@mnemon-dev/dsh-mnemon',
    repoFullName: 'mnemon-dev/mnemon',
    name: 'Mnemon',
    shortDescription: '长期记忆：跨会话记住项目约定与你的偏好，不用每次重新交代。',
    categories: ['tool', 'agent', 'memory', 'dev'],
    version: '0.1.0',
    stars: 456,
    license: 'MIT',
    reason: '记忆是 harness 生态最刚需的一块。',
  },
  {
    packageName: 'dshmarket',
    repoFullName: 'dsh-market/dsh-market',
    name: 'DSH Market',
    shortDescription: '另一个插件市场实现，可直接对照本商店的索引与信任口径。',
    categories: ['hub'],
    version: '1.9.0',
    stars: 419,
    license: 'MIT',
    reason: '同类工具可互验索引质量，也是本商店的参照物。',
  },
  {
    packageName: 'dsh-at-file',
    repoFullName: 'omdsh-dev/dsh-at-file',
    name: 'At File',
    shortDescription: '输入框里用 @ 直接引用文件/目录，路径不用手打。',
    categories: ['other'],
    version: '0.6.0',
    stars: 143,
    license: 'MIT',
    reason: '小而天天用，输入体验提升明显。',
  },
  {
    packageName: '@omdsh-dev/dsh-genui',
    repoFullName: 'omdsh-dev/dsh-genui',
    name: 'GenUI',
    shortDescription: '让模型直接吐组件化界面，把回答变成可点的面板。',
    categories: ['ui'],
    version: '0.8.5',
    stars: 120,
    license: 'MIT',
    reason: '展示型场景的差异化能力。',
  },
  {
    packageName: '@deepseek-ai/dsh-client-ui-aqua',
    repoFullName: 'WYH66666666/DSH-Transparent-UI-Plugin',
    name: 'Aqua 透明 UI',
    shortDescription: '透明 / 毛玻璃风格皮肤，桌面场景观感更好。',
    categories: ['ui'],
    version: '1.1.2',
    stars: 73,
    license: 'MIT',
    reason: '外观类刚需，装完即见效。',
  },
  {
    packageName: 'dsh-notification',
    repoFullName: 'omdsh-dev/dsh-notification',
    name: 'Notification',
    shortDescription: '任务跑完发系统通知，长任务不用盯着屏幕。',
    categories: ['notify'],
    version: '0.1.2',
    stars: 52,
    license: 'MIT',
    reason: '长任务场景的实际痛点。',
  },
  {
    packageName: 'dsh-open-in-vscode',
    repoFullName: 'omdsh-dev/dsh-open-in-vscode',
    name: 'Open in VS Code',
    shortDescription: '一键把当前工作目录丢进 VS Code。',
    categories: ['dev'],
    version: '0.1.6',
    stars: 46,
    license: 'MIT',
    reason: '衔接编辑器，工作流顺滑度提升。',
  },
  {
    packageName: 'dsh-web-plugin-manager',
    repoFullName: 'LX2000WASD/dsh-web-plugin-manager',
    name: 'Web Plugin Manager',
    shortDescription: 'Web 端插件开关管理面板，按分组批量启用/停用。',
    categories: ['hub'],
    version: '0.4.2',
    stars: 46,
    license: 'MIT',
    reason: '与本商店的插件管理视角互补。',
  },
  {
    packageName: 'dsh-context',
    repoFullName: 'bowenliang123/dsh-context',
    name: 'Context Meter',
    shortDescription: '实时显示上下文占用，避免聊到一半被压缩。',
    categories: ['ui', 'usage'],
    version: '0.9.0',
    stars: 44,
    license: 'MIT',
    reason: '和本商店的「用量」tab 一个方向，可对照。',
  },
  {
    packageName: 'dsh-skill-viewer',
    repoFullName: 'Fishquito7/dsh-skill-viewer',
    name: 'Skill Viewer',
    shortDescription: '浏览本机已装技能，看每个技能的触发条件与内容。',
    categories: ['tool', 'docs'],
    version: '0.6.4',
    stars: 40,
    license: 'MIT',
    reason: '配合「技能商店」内建插件一起用最顺。',
  },
  {
    packageName: 'dsh-cost-meter',
    repoFullName: 'Han-1413141/dsh-cost-meter',
    name: 'Cost Meter',
    shortDescription: '按调用计费统计，和本商店的版本化价格表可互相校验。',
    categories: ['tool', 'ui', 'usage'],
    version: '1.3.1',
    stars: 39,
    license: 'MIT',
    reason: '费用透明度是高频诉求。',
  },
  {
    packageName: 'dsh-reasoning-effort',
    repoFullName: 'HanaAyane/dsh-reasoning-effort',
    name: 'Reasoning Effort',
    shortDescription: '一键切换推理强度（低/中/高），在速度与质量之间快速取舍。',
    categories: ['ui', 'dev'],
    version: '0.4.0',
    stars: 35,
    license: 'MIT',
    reason: 'deepseek-v4 系列调参的日常操作。',
  },
];

/** 把一条预置条目转成数据库行。 */
function toRow(seed: SeedPlugin): PluginRow {
  const now = new Date().toISOString();
  const pkg = {
    name: seed.packageName,
    version: seed.version,
    description: seed.shortDescription,
    license: seed.license,
    dsh: { client: { platform: 'web' } },
  };
  return {
    packageName: seed.packageName,
    repoFullName: seed.repoFullName,
    repoUrl: `https://github.com/${seed.repoFullName}`,
    name: seed.name,
    description: seed.shortDescription,
    shortDescription: seed.shortDescription,
    developer: seed.repoFullName.split('/')[0] ?? '',
    iconUrl: null,
    categories: JSON.stringify(seed.categories),
    version: seed.version,
    stars: seed.stars,
    downloads: 0,
    forks: 0,
    topics: JSON.stringify(['dsh-plugin', 'seed']),
    license: seed.license,
    homepage: `https://github.com/${seed.repoFullName}`,
    defaultBranch: 'main',
    readme: `# ${seed.name}\n\n${seed.shortDescription}\n\n> 本条目来自插件商店的**预置目录**（随包发布，无需联网）。镜像同步完成后会自动补上真实元数据。\n`,
    usage: '',
    screenshots: '[]',
    packageJson: JSON.stringify(pkg),
    updatedAt: now,
    // 标记来源：镜像同步写入的行是 ISO 时间，预置行带 seed: 前缀。
    syncedAt: `seed:${SEED_CATALOG_VERSION}`,
    trustLevel: null,
  };
}

/** 预置包名集合（UI 打标记用）。 */
export function seedPackageNames(db: StoreDB): Set<string> {
  const raw = db.getMeta(META_NAMES);
  if (raw === null) return new Set(SEED_PLUGINS.map((s) => s.packageName));
  try {
    const parsed = JSON.parse(raw) as string[];
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch {
    return new Set(SEED_PLUGINS.map((s) => s.packageName));
  }
}

export interface SeedResult {
  /** 目录版本。 */
  version: string;
  /** 本次新插入的行数。 */
  inserted: number;
  /** 本次刷新（原本就是预置行）的行数。 */
  refreshed: number;
  /** 已由真实同步覆盖、因此跳过的行数。 */
  skipped: number;
  /** 是否因为目录版本未变而整体跳过。 */
  upToDate: boolean;
}

/**
 * 把预置目录写进数据库（幂等）。
 *
 * 只插不覆盖：已经有真实同步数据的包一律跳过；预置行自己（syncedAt 以
 * `seed:` 开头）在目录升级时刷新。
 */
export function seedCatalog(db: StoreDB, force = false): SeedResult {
  const current = db.getMeta(META_VERSION);
  if (!force && current === SEED_CATALOG_VERSION) {
    return { version: SEED_CATALOG_VERSION, inserted: 0, refreshed: 0, skipped: 0, upToDate: true };
  }

  let inserted = 0;
  let refreshed = 0;
  let skipped = 0;
  for (const seed of SEED_PLUGINS) {
    const existing = db.getPlugin(seed.packageName);
    if (existing !== undefined && !existing.syncedAt.startsWith('seed:')) {
      // 真实同步的数据更完整（有 README、版本历史、issues），不覆盖。
      skipped += 1;
      continue;
    }
    db.upsertPlugin(toRow(seed));
    if (existing === undefined) inserted += 1;
    else refreshed += 1;
  }

  db.setMeta(META_VERSION, SEED_CATALOG_VERSION);
  db.setMeta(META_NAMES, JSON.stringify(SEED_PLUGINS.map((s) => s.packageName)));
  return { version: SEED_CATALOG_VERSION, inserted, refreshed, skipped, upToDate: false };
}
