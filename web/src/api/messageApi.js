export async function sendMessage(number, text) {
  try {
    const response = await fetch("http://localhost:8080/api/message/send", { // <-- aqui
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ number, text })
    });

    if (!response.ok) {
      const data = await response.json();
      throw { status: response.status, ...data };
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
