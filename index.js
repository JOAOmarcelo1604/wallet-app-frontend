const validateUser = async (email) => {
  try {
    const response = await fetch(
      `https://wallet-app-api-mz8g.onrender.com/users?email=${email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao validar o usuário");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro:", error);
    return { error }; // Para evitar que o erro quebre a aplicação
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
  window.location.href = "./src/pages/home/index.html"; // Melhor que `window.open()`
};
