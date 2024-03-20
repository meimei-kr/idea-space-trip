import { HomePresentation } from "@/app/presentation/Home/HomePresentation";
import { LinkButtonProps } from "@/types";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Session } from "next-auth";

// Buttonコンポーネントをモック化
const mockButton = jest.fn();
jest.mock("@/components/elements/LinkButton/LinkButton", () => ({
  __esModule: true,
  default: (props: LinkButtonProps) => {
    mockButton(props);
    return <a href="#">{props.children}</a>;
  },
}));

describe("Home", () => {
  describe("Hero Section", () => {
    it("should the earth image", () => {
      render(<HomePresentation session={null} />);
      expect(screen.getByTestId("earth")).toBeInTheDocument();
    });

    it("should render the slogan correctly", () => {
      render(<HomePresentation session={null} />);
      expect(screen.getByText("EXPLORE")).toBeInTheDocument();
      expect(screen.getByText("INFINITE")).toBeInTheDocument();
      expect(screen.getByText("CREATIVITY")).toBeInTheDocument();
    });
  });

  describe("About Section", () => {
    it("should render the about image", () => {
      render(<HomePresentation session={null} />);
      expect(screen.getByTestId("about")).toBeInTheDocument();
    });

    it("should render the title correctly", () => {
      render(<HomePresentation session={null} />);
      expect(screen.getByText(/宇宙のように広がる/)).toBeInTheDocument();
      expect(screen.getByText(/無限のアイデア/)).toBeInTheDocument();
    });

    it("should render the quotes correctly", () => {
      render(<HomePresentation session={null} />);
      const quoteStart = screen.getAllByTestId("quote-start");
      expect(quoteStart.length).toBe(2);
      const quoteEnd = screen.getAllByTestId("quote-end");
      expect(quoteEnd.length).toBe(2);
    });

    it("should render quoted text correctly", () => {
      render(<HomePresentation session={null} />);
      expect(screen.getByText("解決したい課題がある")).toBeInTheDocument();
      expect(
        screen.getByText("こんなことができたらいいのに"),
      ).toBeInTheDocument();
    });

    it("should render about description correctly", () => {
      render(<HomePresentation session={null} />);
      expect(
        screen.getByText(
          /そんな風に思いながら、具体的にどんなことをしたらいいのかアイデアに詰まってしまっていませんか？/,
        ),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /このアプリなら、有名なアイデア発想法に沿って、AIのサポートを受けながらアイデア出しが行なえます。/,
        ),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /さぁ、IDEA SPACE TRIPで、一緒に創造性の宇宙を旅してみましょう！/,
        ),
      ).toBeInTheDocument();
    });
  });

  describe("Features Section", () => {
    it("should render the features image", () => {
      render(<HomePresentation session={null} />);
      expect(screen.getByTestId("features")).toBeInTheDocument();
    });

    it("should render the features numbers correctly", () => {
      render(<HomePresentation session={null} />);
      expect(screen.getByTestId("one")).toBeInTheDocument();
      expect(screen.getByTestId("two")).toBeInTheDocument();
      expect(screen.getByTestId("three")).toBeInTheDocument();
    });

    it("should render the AI feature", () => {
      render(<HomePresentation session={null} />);
      expect(screen.getByText("AIとアイデア出し")).toBeInTheDocument();
      expect(
        screen.getByText(
          /世の中には数多くのアイデア発想法がありますが、このアプリでは考え方が提示されるので、/,
        ),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /どのアイデア発想法を使おうかな？と迷う心配はありません。/,
        ),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /ヒントや回答例もAIが出してくれるので、アイデア出しに詰まらずに済みます。/,
        ),
      ).toBeInTheDocument();
    });

    it("should render the voice input feature", () => {
      render(<HomePresentation session={null} />);
      expect(screen.getByText("音声入力対応")).toBeInTheDocument();
      expect(
        screen.getByText(
          /手入力せずアイデアを記録したい方のために、音声入力機能を搭載しています。/,
        ),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /話すことでさらにアイデアが湧き出し、さらなるインスピレーションを引き出せます。/,
        ),
      ).toBeInTheDocument();
    });

    it("should render the idea memo feature", () => {
      render(<HomePresentation session={null} />);
      expect(screen.getByText("アイデアメモ")).toBeInTheDocument();
      expect(
        screen.getByText(
          /アイデアを自動で保存し、後で振り返ることができるストックメモ機能を備えています。/,
        ),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /メモから実行に移すも良し、新たなアイデアの発想につなげるも良し。貴重なひらめきを大切に保存しましょう。/,
        ),
      ).toBeInTheDocument();
    });
  });

  describe("Login Section", () => {
    it("should render the login button when user is unauthenticated", async () => {
      render(<HomePresentation session={null} />);

      const button = screen.getByRole("link", { name: "LOGIN" });
      await waitFor(() => userEvent.click(button));

      expect(mockButton).toHaveBeenCalledWith(
        expect.objectContaining({
          color: "pink",
          size: "large",
          href: "/auth/signin",
        }),
      );
    });

    it("should render the next page button when user is authenticated", async () => {
      const session: Session = {
        user: {
          userId: "1",
          name: "test",
          email: "test@gmail.com",
          provider: "google",
        },
        expires: "2024-02-26T05:24:55.329Z",
      };
      render(<HomePresentation session={session} />);

      const button = screen.getByRole("link", { name: "NEXT PAGE" });
      await waitFor(() => userEvent.click(button));

      expect(mockButton).toHaveBeenCalledWith(
        expect.objectContaining({
          color: "pink",
          size: "large",
          href: "/auth/signin",
        }),
      );
    });
  });
});
