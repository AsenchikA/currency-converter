class ApiModule {
  private baseUrl: string;

  constructor(url = 'https://api.frankfurter.app') {
    this.baseUrl = url;
  }

  public get = <T>(url: string) => this.request<T>('GET', url);

  public post = <T>(url: string, data: unknown) => this.request<T>('POST', url, data);

  public delete = (url: string, data: unknown) => this.request('DELETE', url, data);

  public put = (url: string, data: unknown) => this.request('PUT', url, data);

  private request = <T>(method: string, url: string, data: unknown = null, headers?: HeadersInit): Promise<T> => {
    const requestInit: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    if (method === 'POST' || method === 'PUT') {
      requestInit.body = JSON.stringify(data);
    }

    return fetch(`${this.baseUrl}${url}`, requestInit).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Error! Status code: ${response.status}`);
      }
    });
  };
}

export const api = new ApiModule();
