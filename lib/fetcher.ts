import useSWR from 'swr';

export default async function useFetch(
  url: string, revalidateOnFocus: boolean = false,
) {
  const { data, error } = useSWR(url, async (fetchUrl) => {
    const response = await fetch(fetchUrl);
    const responseData = await response.json();

    return responseData;
  }, { revalidateOnFocus });

  return { data, error };
}
