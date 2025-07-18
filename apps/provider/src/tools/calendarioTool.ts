import { DynamicTool } from '@langchain/core/tools';

// Função para obter a data atual
function getCurrentDateTime({ format = 'default' } = {}) {
  const now = new Date();
  let formattedDate;

  // Definir opções com tipos corretos para DateTimeFormatOptions
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric', // Literal type: 'numeric' | '2-digit'
    month: '2-digit', // Literal type: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow'
    day: '2-digit', // Literal type: 'numeric' | '2-digit'
    hour: '2-digit', // Literal type: 'numeric' | '2-digit'
    minute: '2-digit', // Literal type: 'numeric' | '2-digit'
    hour12: false, // Boolean
  };

  switch (format.toLowerCase()) {
    case 'iso':
      formattedDate = now.toISOString();
      break;
    case 'short':
      formattedDate = now.toLocaleDateString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
      break;
    case 'full':
      formattedDate = now.toLocaleString('pt-BR', options);
      break;
    default:
      formattedDate = `Hoje é ${now.toLocaleDateString('pt-BR', options)} às ${now.toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit', hour12: false })}`;
      break;
  }

  return {
    status: 'success',
    date: formattedDate,
    timestamp: now.toISOString(),
  };
}

async function handleDateAction(input: string) {
  try {
    const inputDict = typeof input === 'string' ? JSON.parse(input) : input;
    const action = inputDict.action || 'get_current_date';

    if (action === 'get_current_date') {
      return getCurrentDateTime({ format: inputDict.format });
    } else {
      return { error: "Ação não suportada. Use 'get_current_date'." };
    }
  } catch (error) {
    return { error: 'Erro ao processar entrada: ' + error };
  }
}

export default new DynamicTool({
  name: 'formatar_data',
  description:
    'Ferramenta para obter a data e hora atuais. A entrada deve ser uma string JSON com "action" (opcional, padrão "get_current_date") e "format" (opcional: "default", "iso", "short", "full").',
  func: handleDateAction,
});
