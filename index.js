const validateUser = async (email) => {
  try {
    const response = await fetch(
      `https://wallet-app-7a9ke16ul-joao-marcelos-projects-89356393.vercel.app/users?email=${email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Se precisar de autenticação, adicione aqui
          // "Authorization": `Bearer ${TOKEN}`
        },
      }
    );

    // Se a resposta não for OK, lança um erro
    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Erro ao validar usuário:", error);
    return { error: error.message };
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
