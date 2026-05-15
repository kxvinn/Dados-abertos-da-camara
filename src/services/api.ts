import { APIResponse, Deputy, Expense, Vote } from "../types";

const BASE_URL = "https://dadosabertos.camara.leg.br/api/v2";

export async function fetchDeputies(): Promise<Deputy[]> {
  try {
    const response = await fetch(`${BASE_URL}/deputados?itens=513`, {
      headers: {
        Accept: "application/json",
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    const data: APIResponse<Deputy> = await response.json();
    return data.dados;
  } catch (error) {
    console.error("Error fetching deputies:", error);
    return [];
  }
}

export async function fetchLatestExpense(deputyId: number): Promise<number> {
  try {
    const response = await fetch(
      `${BASE_URL}/deputados/${deputyId}/despesas?itens=1&ordem=DESC&ordenarPor=ano`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    const data: APIResponse<Expense> = await response.json();
    return data.dados[0]?.valorDocumento || 0;
  } catch (error) {
    console.error(`Error fetching expense for ${deputyId}:`, error);
    return 0;
  }
}

export async function fetchVotes(deputyId: number): Promise<Vote[]> {
  const response = await fetch(
    `${BASE_URL}/deputados/${deputyId}/votacoes?itens=10&ordem=DESC&ordenarPor=dataHoraRegistro`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  const data: APIResponse<any> = await response.json();
  return data.dados.map((v: any) => ({
    descricao: v.descricao,
    tipoVoto: v.tipoVoto,
    dataHora: v.dataHoraRegistro,
  }));
}

export async function fetchDeputyDetails(deputyId: number): Promise<any> {
  try {
    const response = await fetch(`${BASE_URL}/deputados/${deputyId}`, {
      headers: {
        Accept: "application/json",
      },
    });
    const data = await response.json();
    return data.dados;
  } catch (error) {
    console.error(`Error fetching details for ${deputyId}:`, error);
    return null;
  }
}

export async function fetchDeputySpeeches(deputyId: number): Promise<any[]> {
  try {
    const response = await fetch(`${BASE_URL}/deputados/${deputyId}/discursos?itens=10&ordem=DESC&ordenarPor=dataHoraInicio`, {
      headers: { Accept: "application/json" },
    });
    const data = await response.json();
    return data.dados;
  } catch (error) {
    console.error(`Error fetching speeches for ${deputyId}:`, error);
    return [];
  }
}

export async function fetchDeputyProfessions(deputyId: number): Promise<any[]> {
  try {
    const response = await fetch(`${BASE_URL}/deputados/${deputyId}/profissoes`, {
      headers: { Accept: "application/json" },
    });
    const data = await response.json();
    return data.dados;
  } catch (error) {
    return [];
  }
}

export async function fetchDeputyOrganisms(deputyId: number): Promise<any[]> {
  try {
    const response = await fetch(`${BASE_URL}/deputados/${deputyId}/orgaos`, {
      headers: { Accept: "application/json" },
    });
    const data = await response.json();
    return data.dados;
  } catch (error) {
    return [];
  }
}

export async function fetchDeputyExpenses(deputyId: number): Promise<Expense[]> {
  try {
    const response = await fetch(`${BASE_URL}/deputados/${deputyId}/despesas?itens=50&ordem=DESC&ordenarPor=ano`, {
      headers: { Accept: "application/json" },
    });
    const data = await response.json();
    return data.dados;
  } catch (error) {
    return [];
  }
}

export async function fetchPropositions(): Promise<any[]> {
  try {
    const response = await fetch(`${BASE_URL}/proposicoes?itens=50&ordem=DESC&ordenarPor=ano`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 }
    });
    const data = await response.json();
    return data.dados;
  } catch (error) {
    return [];
  }
}

export async function fetchVotesList(): Promise<any[]> {
  try {
    const response = await fetch(`${BASE_URL}/votacoes?itens=50&ordem=DESC&ordenarPor=dataHoraRegistro`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 }
    });
    const data = await response.json();
    return data.dados;
  } catch (error) {
    return [];
  }
}

export async function fetchParties(): Promise<any[]> {
  try {
    const response = await fetch(`${BASE_URL}/partidos?itens=50`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 86400 } // 24h
    });
    const data = await response.json();
    return data.dados;
  } catch (error) {
    return [];
  }
}

export async function fetchOrganismsList(): Promise<any[]> {
  try {
    const response = await fetch(`${BASE_URL}/orgaos?itens=50`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 86400 }
    });
    const data = await response.json();
    return data.dados;
  } catch (error) {
    return [];
  }
}

export async function fetchLegislatures(): Promise<any[]> {
  try {
    const response = await fetch(`${BASE_URL}/legislaturas?itens=10&ordem=DESC&ordenarPor=id`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 86400 }
    });
    const data = await response.json();
    return data.dados;
  } catch (error) {
    return [];
  }
}

export async function fetchBlocks(): Promise<any[]> {
  try {
    const response = await fetch(`${BASE_URL}/blocos?itens=50`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 86400 }
    });
    const data = await response.json();
    return data.dados;
  } catch (error) {
    return [];
  }
}

export async function fetchFronts(): Promise<any[]> {
  try {
    const response = await fetch(`${BASE_URL}/frentes?itens=50`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 86400 }
    });
    const data = await response.json();
    return data.dados;
  } catch (error) {
    return [];
  }
}

export async function fetchEvents(): Promise<any[]> {
  try {
    const response = await fetch(`${BASE_URL}/eventos?itens=50&ordem=DESC&ordenarPor=dataHoraInicio`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 }
    });
    const data = await response.json();
    return data.dados;
  } catch (error) {
    return [];
  }
}
