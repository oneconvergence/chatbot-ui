
export const config = {
  runtime: 'edge',
};

const handler = async (req: Request): Promise<Response> => {
  try {
    const url = 'https://p2.gptfu.com/api/models-enabled'
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 401) {
      return new Response(response.body, {
        status: 500,
        headers: response.headers,
      });
    } else if (response.status !== 200) {
      console.error(
        `Gptfu API returned an error ${
          response.status
        }: ${await response.text()}`,
      );
      throw new Error('Gptfu API returned an error');
    }

    const json = await response.json();
    const models: any[] =  Object.keys(json).map(key => ({
      id:key,
      tag:key,
      ...json[key],
      name:key
    }));
    
    return new Response(JSON.stringify(models), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Error', { status: 500 });
  }
};

export default handler;
