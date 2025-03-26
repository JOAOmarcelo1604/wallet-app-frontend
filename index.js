const validateUser = async (email) => {
  const token = "msrbe1fZSR5Iwu5x2JKcxF8b"; // Token correto

  try {
    const response = await fetch(
      `https://wallet-app-4x77417g4-joao-marcelos-projects-89356393.vercel.app/users?email=${email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // String correta
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
