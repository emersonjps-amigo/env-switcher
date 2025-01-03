const fs = require("fs-extra");
const path = require("path");

// Diretório de trabalho
const WORKSPACE_PATH = "../";
const PROJECTS = ["amigo/server", "callcenter-api", "finance-api", "health-insurance-api", "nfse-api", "medical-fees-api", "inventory-api"]; // Substitua pelos nomes dos seus projetos
const ENV_FILES = [".env", ".env.development"];

// Parâmetro para alterar envs
const mode = process.argv[2]; // 'home' ou 'office'
if (!["home", "office"].includes(mode)) {
  console.error('Por favor, informe "home" ou "office" como argumento.');
  process.exit(1);
}


const normalizeEnv = async (filePath) => {
  try {
    const lines = await fs
      .readFile(filePath, "utf-8")
      .then((data) => data.split("\n"));

    const normalizeLines = lines.map( line => {
      if (!line.includes('#') && line.includes("AMIGO_DB_HOST=")) return `# ${line}`;
      if (!line.includes('#') && line.includes("DB_HOST=")) return `# ${line}`;
      return line;
    });

    await fs.writeFile(filePath, normalizeLines.join("\n"), "utf-8");
  } catch (error) {
    console.error(`Erro ao processar normalização ${filePath}:`, error.message);
  }
}

const toggleEnv = async (filePath, mode) => {
  try {
    await normalizeEnv(filePath);

    const lines = await fs
      .readFile(filePath, "utf-8")
      .then((data) => data.split("\n"));

    const updatedLines = lines.map( line => {
      //home
      if (line.startsWith("AMIGO_DB_HOST=\"d")) return mode === "home" ? `# ${line}` : line;
      if (line.startsWith("AMIGO_DB_HOST=d")) return mode === "home" ? `# ${line}` : line;
      if (line.startsWith("# AMIGO_DB_HOST=\"1")) return mode === "home" ? line.slice(2) : line;
      if (line.startsWith("# AMIGO_DB_HOST=1")) return mode === "home" ? line.slice(2) : line;
      if (line.startsWith("#AMIGO_DB_HOST=\"1")) return mode === "home" ? line.slice(2) : line;
      if (line.startsWith("#AMIGO_DB_HOST=1")) return mode === "home" ? line.slice(2) : line;
      if (line.startsWith("DB_HOST=\"d")) return mode === "home" ? `# ${line}` : line;
      if (line.startsWith("DB_HOST=d")) return mode === "home" ? `# ${line}` : line;
      if (line.startsWith("# DB_HOST=\"local")) return mode === "home" ? line.slice(2) : line;
      if (line.startsWith("# DB_HOST=local")) return mode === "home" ? line.slice(2) : line;
      if (line.startsWith("#DB_HOST=\"local")) return mode === "home" ? line.slice(2) : line;
      if (line.startsWith("#DB_HOST=local")) return mode === "home" ? line.slice(2) : line;

      // office
      if (line.startsWith("AMIGO_DB_HOST=\"1")) return mode === "office" ? `# ${line}` : line;
      if (line.startsWith("AMIGO_DB_HOST=1")) return mode === "office" ? `# ${line}` : line;
      if (line.startsWith("# AMIGO_DB_HOST=\"d")) return mode === "office" ? line.slice(2) : line;
      if (line.startsWith("# AMIGO_DB_HOST=d")) return mode === "office" ? line.slice(2) : line;
      if (line.startsWith("#AMIGO_DB_HOST=\"d")) return mode === "office" ? line.slice(2) : line;
      if (line.startsWith("#AMIGO_DB_HOST=d")) return mode === "office" ? line.slice(2) : line;
      if (line.startsWith("DB_HOST=\"local")) return mode === "office" ? `# ${line}` : line;
      if (line.startsWith("DB_HOST=local")) return mode === "office" ? `# ${line}` : line;
      if (line.startsWith("# DB_HOST=\"d")) return mode === "office" ? line.slice(2) : line;
      if (line.startsWith("# DB_HOST=d")) return mode === "office" ? line.slice(2) : line;
      if (line.startsWith("#DB_HOST=\"d")) return mode === "office" ? line.slice(2) : line;
      if (line.startsWith("#DB_HOST=d")) return mode === "office" ? line.slice(2) : line;

      return line;
    });

    await fs.writeFile(filePath, updatedLines.join("\n"), "utf-8");
    console.log(`Atualizado: ${filePath}`);
  } catch (error) {
    console.error(`Erro ao processar ${filePath}:`, error.message);
  }
};

(async () => {
  for (const project of PROJECTS) {
    const projectPath = path.join(WORKSPACE_PATH, project);
    for (const envFile of ENV_FILES) {
      const filePath = path.join(projectPath, envFile);
      if (await fs.pathExists(filePath)) {
        await toggleEnv(filePath, mode);
      } else {
        console.log(`Arquivo não encontrado: ${filePath}`);
      }
    }
  }
})();
