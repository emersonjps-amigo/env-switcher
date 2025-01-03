# Switcher Env
Facilitador de troca de envs para ambiente de escritorio ou casa

- Adicione o repositório no mesmo local dos projetos da amigo que vão ter suas envs ajustadas
- Instale as dependências com npm i ou yarn
- modos de utilização
  
## Como Executar

casa: ```npm run home``` ou ```yarn home```

office```npm run office``` ou ```yarn office```


# Normalização de Variáveis de Ambiente

Este script automatiza a troca de valores nas variáveis de ambiente para diferentes cenários (home e office). Ele realiza ajustes nas configurações de arquivos `.env` e `.env.development`, com base nas linhas específicas definidas no código.

## Lógica de Substituição

O script suporta a normalização das seguintes linhas relacionadas às variáveis `AMIGO_DB_HOST` e `DB_HOST`:

### Modo **Home**
No modo `home`, o script:
- Comenta linhas que começam com valores correspondentes ao ambiente de desenvolvimento do escritório (`dev-amigo`) para `AMIGO_DB_HOST` e `DB_HOST`.
- Descomenta linhas que começam com valores locais (`127` ou `local`) para essas variáveis.

**Exemplos de linhas tratadas:**

- **Linhas comentadas pelo script:**
  ```plaintext
  AMIGO_DB_HOST="dev-amigo.<sufixo>"
  AMIGO_DB_HOST=dev-amigo.<sufixo>
  DB_HOST="dev-amigo.<sufixo>"
  DB_HOST=dev-amigo.<sufixo>
  ```
  O script transforma essas linhas em:
  ```plaintext
  # AMIGO_DB_HOST="dev-amigo.<sufixo>"
  # AMIGO_DB_HOST=dev-amigo.<sufixo>
  # DB_HOST="dev-amigo.<sufixo>"
  # DB_HOST=dev-amigo.<sufixo>
  ```

- **Linhas descomentadas pelo script:**
  ```plaintext
  # AMIGO_DB_HOST="127.0.0.1"
  # AMIGO_DB_HOST=127.0.0.1
  # DB_HOST="local"
  # DB_HOST=local
  ```
  O script transforma essas linhas em:
  ```plaintext
  AMIGO_DB_HOST="127.0.0.1"
  AMIGO_DB_HOST=127.0.0.1
  DB_HOST="local"
  DB_HOST=local
  ```

### Modo **Office**
No modo `office`, o script:
- Comenta linhas que começam com valores locais (`127` ou `local`) para `AMIGO_DB_HOST` e `DB_HOST`.
- Descomenta linhas que começam com valores correspondentes ao ambiente de desenvolvimento do escritório (`dev-amigo`).

**Exemplos de linhas tratadas:**

- **Linhas comentadas pelo script:**
  ```plaintext
  AMIGO_DB_HOST="127.0.0.1"
  AMIGO_DB_HOST=127.0.0.1
  DB_HOST="local"
  DB_HOST=local
  ```
  O script transforma essas linhas em:
  ```plaintext
  # AMIGO_DB_HOST="127.0.0.1"
  # AMIGO_DB_HOST=127.0.0.1
  # DB_HOST="local"
  # DB_HOST=local
  ```

- **Linhas descomentadas pelo script:**
  ```plaintext
  # AMIGO_DB_HOST="dev-amigo.<sufixo>"
  # AMIGO_DB_HOST=dev-amigo.<sufixo>
  # DB_HOST="dev-amigo.<sufixo>"
  # DB_HOST=dev-amigo.<sufixo>
  ```
  O script transforma essas linhas em:
  ```plaintext
  AMIGO_DB_HOST="dev-amigo.<sufixo>"
  AMIGO_DB_HOST=dev-amigo.<sufixo>
  DB_HOST="dev-amigo.<sufixo>"
  DB_HOST=dev-amigo.<sufixo>
  ```

## Observações

- As variáveis são tratadas independentemente do uso de aspas duplas (`"`) ou nenhum delimitador.
- O script adiciona ou remove o caractere de comentário (`#`) de acordo com o modo selecionado.

