import { PerspectivesType } from "@/types";

// 観点リスト
export const perspectives: PerspectivesType = {
  modify: {
    name: "変更",
    description: "色、動き、音、匂い、温度、形などを変えられないか考えてみよう",
  },
  substitute: {
    name: "代用",
    description: "他のものや、他の方法で代用できないか考えてみよう",
  },
  reverse: {
    name: "逆転",
    description: "上下、左右、表裏、立場、役割を逆にできないか考えてみよう",
  },
  combine: {
    name: "結合",
    description: "他のものと組み合わせて新しいものを作れないか考えてみよう",
  },
  magnify: {
    name: "拡大",
    description:
      "大きく、強く、高く、長く、厚くしてみるとどうなるか考えてみよう",
  },
  minify: {
    name: "縮小",
    description:
      "小さく、軽く、低く、短く、薄くしてみるとどうなるか考えてみよう",
  },
};

// 観点リストの中からランダムに３つ選ぶ
export const selectThreePerspectives = (perspectives: PerspectivesType) => {
  const keys = Object.keys(perspectives);
  const selectedKeys: string[] = [];
  while (selectedKeys.length < 3) {
    const randomIndex = Math.floor(Math.random() * keys.length);
    const key = keys[randomIndex]!;
    if (!selectedKeys.includes(key)) {
      selectedKeys.push(key);
    }
  }
  // 選択されたキーに基づいて、日本語名と説明を取得
  const selectedPerspectives = selectedKeys.map((key) => {
    return {
      name: perspectives[key]!.name,
      description: perspectives[key]!.description,
    };
  });

  return selectedPerspectives;
};
