# Documentacao do Projeto: WhatsAppBot

## 1. Visão Geral do Projeto

O **WhatsApp Bot** é um projeto desenvolvido para automatizar interações via WhatsApp. Ele permitirá o envio e recebimento de mensagens, criação de menus interativos e integração com sistemas externos, servindo como base para atendimento automatizado, protótipos de chatbots ou integração com CRMs.

**Objetivos principais:**

- Automatizar o envio de mensagens via WhatsApp.
- Implementar menus e respostas automáticas baseadas em interações do usuário.
- Pesquisar e integrar APIs ou bibliotecas que permitam manipulação de **WhatsApp Flow**, garantindo escalabilidade e confiabilidade.

---

## 2. Informações de Desenvolvimento

- **Linguagem:** JavaScript (Node.js)
- **Frameworks/Bibliotecas:**
    - `axios` – para requisições HTTP.
    - `express` – para criação do servidor web e endpoints REST.
    - `dotenv` – para gerenciamento de variáveis de ambiente.
- **Banco de Dados:** MySQL (opcional, para armazenamento de histórico de mensagens ou dados de usuários).
- **API/Biblioteca de WhatsApp:** **ainda em avaliação**.
    - Atualmente, **WAPI** é a opção cotada, por permitir integração via WhatsApp Web.
    - Pretende-se pesquisar outras alternativas, levando em consideração:
        - **Custo**;
        - **Dificuldade de implementação**;
        - **Documentação completa e clara**;
        - **Capacidade de manipular WhatsApp Flow** (interações, menus, respostas automáticas).

---

## 3. Estrutura do Projeto

```
whatsapp_bot/
│
├─ data/
│   ├─ menus.json          # Estrutura de menus e opções do bot
│   └─ responses.json      # Respostas automáticas
│
├─ services/
│   └─ ultramessage.service.js  # Lógica de envio de mensagens
│
├─ utils/
│   └─ logger.js           # Funções de log
│
├─ server.js               # Servidor principal
├─ package.json            # Dependências do projeto
└─ .env                    # Variáveis de ambiente (não versionadas)

```

---

## 4. Bibliotecas e APIs Utilizadas / Cotadas

| Biblioteca/API | Finalidade | Status |
| --- | --- | --- |
| axios | Requisições HTTP para APIs externas | Em uso |
| express | Criação de endpoints REST | Em uso |
| dotenv | Gerenciamento de variáveis de ambiente | Em uso |
| WAPI.js | Integração via WhatsApp Web | Cotada, em avaliação |
| API Oficial WhatsApp | Envio de mensagens oficiais | A ser pesquisada |
| MySQL | Armazenamento de informações de usuários e histórico | Em uso (opcional) |

---

## 5. Estrutura de Versionamento (Git)

O projeto seguirá uma **estrutura de branches dividida em quatro**:

1. **`master`** – Branch principal, contém a versão em operação do bot.
2. **`release`** – Branch de preparação para o `master`, utilizada para testes antes de uma nova versão oficial.
3. **`dev/hiago`** – Branch de desenvolvimento individual do desenvolvedor Hiago.
4. **`dev/fernando`** – Branch de desenvolvimento individual do desenvolvedor Fernando.
    
    ![Diagrama de Branchs(WhastappBot).png](Diagrama_de_Branchs(WhastappBot).png)
    

**Commit messages padrão:**

- `feat:` – nova funcionalidade
- `fix:` – correção de bug
- `docs:` – alteração na documentação
- `chore:` – tarefas administrativas ou mudanças de configuração

## 6. Deployment / DevOps

O deployment do projeto **ainda está em estudo**. A ideia principal é garantir que o bot seja executável de forma isolada para cada cliente (single-tenant) e que possa ser facilmente replicado em diferentes instâncias.

- **Infraestrutura em estudo:**
    - **AWS EC2**: a intenção é utilizar instâncias EC2 para hospedar o bot.
    - O objetivo é avaliar custo, escalabilidade e facilidade de manutenção.
- **Dockerização:**
    - A pretensão é **dockerizar o projeto**, permitindo que ele seja executado em qualquer instância ou ambiente de forma padronizada.
    - Isso facilitará o deploy em múltiplas instâncias, mantendo cada bot isolado (single-tenant).
- **Execução local (para desenvolvimento/testes):**
    - Instalar Node.js
    - Configurar `.env` com variáveis do WhatsApp e banco
    - Executar: `node server.js`
- **Exemplo de Docker (planejado):**
    
    ```bash
    docker build -t whatsapp-bot .
    docker run -d --env-file .env whatsapp-bot
    
    ```
    
- **Monitoramento e logs:**
    - Uso de logger customizado ou bibliotecas como `winston`.
    - Integração futura com serviços como CloudWatch ou Loggly para monitoramento de instâncias.

💡 **Resumo:** O método final de deploy será definido após análise do melhor custo-benefício, escalabilidade e facilidade de manutenção, mas a intenção clara é usar **AWS + Docker** para garantir portabilidade e isolamento por cliente (single-tenant).
