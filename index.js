const validateUser = async (email) => {
  const token = "msrbe1fZSR5Iwu5x2JKcxF8b"; // Seu token aqui

  try {
    const response = await fetch(
      `https://wallet-app-9vwab65gr-joao-marcelos-projects-89356393.vercel.app/users?email=${email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Token de autenticação
        },
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao validar o usuário");
    }

    const data = await response.json();
    return data; // Retorna os dados da resposta, se necessário
  } catch (error) {
    console.error("Erro:", error);
    throw error; // Lança o erro para que possa ser tratado em outro lugar
  }
};

const onClickLogin = async () => {
  const email = document.getElementById("input-email").value;
  if (email.length < 5 || !email.includes("@")) {
    alert("Email inválido!");
    return;
  }
  const result = await validateUser(email);

  if (result.error) {
    alert("Falha ao validar e-mail.");
    return;
  }
  localStorage.setItem("@WalletApp:userEmail", result.email);
  localStorage.setItem("@WalletApp:userName", result.name);
  localStorage.setItem("@WalletApp:userId", result.id);
  window.open("./src/pages/home/index.html", "_self");
};
