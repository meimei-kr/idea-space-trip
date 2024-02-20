import Stars from "@/components/layouts/Stars/Stars";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

jest.mock("@tsparticles/react", () => {
  // デフォルトエクスポートのモック
  const ParticlesMock = jest.fn(() => <div>Particles</div>);
  // 名前付きエクスポートのモック
  const initParticlesEngineMock = jest.fn().mockResolvedValue(true);

  return {
    __esModule: true, // ES モジュールとしてモックを扱うために必要
    default: ParticlesMock, // デフォルトエクスポートのモックを設定
    initParticlesEngine: initParticlesEngineMock, // 名前付きエクスポートのモックを設定
  };
});

jest.mock("@tsparticles/slim", () => ({
  loadSlim: jest.fn().mockResolvedValue(true), // mock関数が非同期処理を行い、成功したプロミス値を返す
}));

describe("Stars", () => {
  it("should render Particles component after initialization", async () => {
    render(<Stars />);

    const particles = await screen.findByText("Particles");
    expect(particles).toBeInTheDocument();
  });
});
