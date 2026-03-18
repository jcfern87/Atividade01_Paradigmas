import * as readline from "readline/promises";

// Cria uma interface com read line para poder pedir input, ler e armazenar as respostas do usuário
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Forma da pergunta
async function askQuestion(question: string): Promise<string> {
  return await rl.question(question);
}

async function isItWhat(number: number): Promise<string> {
  if (number == 0) {
    return "zero";
  } else if (number < 0) {
    return "negativo";
  } else {
    return "positivo";
  }
}

async function parImpar(num: number): Promise<string> {
  if (num % 2 == 0) {
    return "par";
  } else {
    return "impar";
  }
}

async function fazerTabuada(numero: number, linhas: number) {
  for (let index = 1; index < linhas + 1; index++) {
    console.log("\n");
    console.log(`${numero} x ${index} = ${numero * index}`);
  }
}

async function median() {
  // Coleta os números e armazena em array
  let numeros: number[] = [];
  for (let index = 0; index < 5; index++) {
    const resposta = await askQuestion("Insira um número: ");

    if (resposta === undefined) {
      throw new Error("Entrada inválida");
    }

    const numero = parseInt(resposta);

    if (isNaN(numero)) {
      console.log("Valor inválido, tente novamente.");
      index--; // repete a iteração
      continue;
    }

    numeros.push(numero);
  }

  // Coleta o maior e o menor
  let maior = numeros[0]!;
  let menor = numeros[0]!;
  let organizada: number[] = [maior]!;
  for (let index = 1; index < numeros.length; index++) {
    const atual = numeros[index]!;
    if (atual > maior) {
      maior = atual;
      organizada.push(maior);
    }
    if (atual < menor) {
      menor = atual;
      organizada.unshift(menor);
    }
  }
  console.log(`\nMaior: ${maior}`);
  console.log(`Menor: ${menor}\n`);

  const media: number =
    (numeros[0]! + numeros[1]! + numeros[2]! + numeros[3]! + numeros[4]!) / 5;
  const mediana = organizada[2];

  console.log(`A média destes 5 números é ${media}, e a mediana é ${mediana}.`);
}

async function main() {
  console.log(
    "Bom dia, boa tarde ou boa noite!\nBem vind@ ao meu programa.\nPrimeiramente, é necessário o seu nome.\n",
  );
  const name: string = await askQuestion("Qual é o seu nome? ");
  console.log(`Olá, ${name}!`);
  console.log(
    "Para começar, é necessário que escolha dois números inteiros (negativo ou positivo).\n",
  );
  const num11: number = parseInt(await askQuestion("Primeiro número: "));
  const num21: number = parseInt(await askQuestion("Segundo número: "));
  console.log(
    `A soma entre os dois números é ${num11 + num21}.\nA subtração entre eles é ${num11 - num21}.\nA multiplicação entre eles é ${num11 * num21}.\nA divisão entre eles é ${num11 / num21}.`,
  );

  const num3: number = parseInt(
    await askQuestion("Agora, insira um número inteiro: "),
  );
  console.log(
    `O número que foi inserido é ${await isItWhat(num3)} e ${await parImpar(num3)}.`,
  );

  console.log(
    "Agora, forneça um número para que a tabuada dele seja imprimida.",
  );
  const num41: number = parseInt(await askQuestion("Número: "));
  const num42: number = parseInt(
    await askQuestion("Quantas linhas da tabuada? "),
  );
  fazerTabuada(num41, num42);
  console.log("\n\n");
  console.log("Para terminar, serão pedidos 5 números de você.");

  median();
}

main().catch((err) => {
  console.error("Erro:", err);
  rl.close();
});
