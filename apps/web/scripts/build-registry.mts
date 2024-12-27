import { existsSync, promises as fs } from "fs";
import path from "path";
import template from "lodash.template";
import { rimraf } from "rimraf";

import { themes } from "../registry/themes";

const REGISTRY_PATH = path.join(import.meta.dir, "../public/registry");

async function buildThemes() {
  const colorsTargetPath = path.join(REGISTRY_PATH);
  rimraf.sync(colorsTargetPath);
  if (!existsSync(colorsTargetPath)) {
    await fs.mkdir(colorsTargetPath, { recursive: true });
  }
  // ----------------------------------------------------------------------------
  // Build registry/themes.css
  // ----------------------------------------------------------------------------
  const THEME_STYLES_WITH_VARIABLES = `
.theme-<%- theme %> {
--background: <%- colors.light["background"] %>;
--foreground: <%- colors.light["foreground"] %>;
}

.dark .theme-<%- theme %> {
--background: <%- colors.dark["background"] %>;
--foreground: <%- colors.dark["foreground"] %>;
}`;

  const themeCSS = [];
  for (const theme of themes) {
    themeCSS.push(
      // @ts-ignore
      template(THEME_STYLES_WITH_VARIABLES)({
        colors: theme.cssVars,
        theme: theme.name,
      }),
    );
  }

  await fs.writeFile(
    path.join(REGISTRY_PATH, `themes.css`),
    themeCSS.join("\n"),
    "utf8",
  );
}

try {
  await buildThemes();

  console.log("✅ Done!");
} catch (error) {
  console.error(error);
  process.exit(1);
}
