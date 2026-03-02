function ButtonSecondary({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        paddingLeft: 32,
        paddingRight: 32,
        paddingTop: 16,
        paddingBottom: 16,
        overflow: "hidden",
        borderRadius: 4,
        outline: "1px var(--neutral-950, #020203) solid",
        outlineOffset: "-1px",
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
        background: "#F5F5F5",
        cursor: "pointer",
      }}
    >
      {/* Text */}
      <div
        style={{
          width: 180,
          height: 20,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="
            text-center
            text-text
            label-1
            font-medium
            break-words
          "
        >
          {text}
        </div>
      </div>
        <div style={{ width: 32, height: 32, position: "relative", overflow: "hidden" }}>
          <div
            style={{
              width: 6.1,
              height: 19.81,
              left: 25.9,
              top: 7.62,
              position: "absolute",
              background: "var(--Text, #020203)",
            }}
          />
          <div
            style={{
              width: 1.52,
              height: 3.05,
              left: 24.38,
              top: 12.19,
              position: "absolute",
              background: "var(--Text, #020203)",
            }}
          />
          <div
            style={{
              width: 19.81,
              height: 3.05,
              left: 6.09,
              top: 27.43,
              position: "absolute",
              background: "var(--Text, #020203)",
            }}
          />
          <div
            style={{
              width: 1.53,
              height: 3.05,
              left: 22.85,
              top: 18.28,
              position: "absolute",
              background: "var(--Text, #020203)",
            }}
          />
          <div
            style={{
              width: 1.53,
              height: 1.52,
              left: 22.85,
              top: 10.67,
              position: "absolute",
              background: "var(--Text, #020203)",
            }}
          />
          <div
            style={{
              width: 3.04,
              height: 1.52,
              left: 19.81,
              top: 16.76,
              position: "absolute",
              background: "var(--Text, #020203)",
            }}
          />
          <div
            style={{
              width: 13.71,
              height: 1.52,
              left: 9.14,
              top: 30.48,
              position: "absolute",
              background: "var(--Text, #020203)",
            }}
          />
          <div
            style={{
              width: 3.04,
              height: 1.53,
              left: 19.81,
              top: 21.33,
              position: "absolute",
              background: "var(--Text, #020203)",
            }}
          />
          <div
            style={{
              width: 1.53,
              height: 3.05,
              left: 18.28,
              top: 18.28,
              position: "absolute",
              background: "var(--Text, #020203)",
            }}
          />
          <div
            style={{
              width: 1.53,
              height: 1.53,
              left: 18.28,
              top: 1.52,
              position: "absolute",
              background: "var(--Text, #020203)",
            }}
          />
          <div
            style={{
              width: 4.57,
              height: 1.52,
              left: 13.71,
              top: 24.38,
              position: "absolute",
              background: "var(--Text, #020203)",
            }}
          />
          <div
            style={{
              width: 4.57,
              height: 1.52,
              left: 13.71,
              top: 0,
              position: "absolute",
              background: "var(--Text, #020203)",
            }}
          />
          <div
            style={{
              width: 1.52,
              height: 3.05,
              left: 12.19,
              top: 18.28,
              position: "absolute",
              background: "var(--Text, #020203)",
            }}
          />
          <div
            style={{
              width: 1.52,
              height: 1.53,
              left: 12.19,
              top: 1.52,
              position: "absolute",
              background: "var(--Text, #020203)",
            }}
          />
          <div
            style={{
              width: 3.05,
              height: 1.52,
              left: 9.14,
              top: 16.76,
              position: "absolute",
              background: "var(--Text, #020203)",
            }}
          />
          <div
            style={{
              width: 13.71,
              height: 7.62,
              left: 9.14,
              top: 3.05,
              position: "absolute",
              background: "var(--Text, #020203)",
            }}
          />
          <div
            style={{
              width: 3.05,
              height: 1.53,
              left: 9.14,
              top: 21.33,
              position: "absolute",
              background: "var(--Text, #020203)",
            }}
          />
          <div
            style={{
              width: 1.52,
              height: 3.05,
              left: 7.62,
              top: 18.28,
              position: "absolute",
              background: "var(--Text, #020203)",
            }}
          />
          <div
            style={{
              width: 1.52,
              height: 1.52,
              left: 7.62,
              top: 10.67,
              position: "absolute",
              background: "var(--Text, #020203)",
            }}
          />
          <div
            style={{
              width: 1.53,
              height: 3.05,
              left: 6.09,
              top: 12.19,
              position: "absolute",
              background: "var(--Text, #020203)",
            }}
          />
          <div
            style={{
              width: 6.09,
              height: 19.81,
              left: 0,
              top: 7.62,
              position: "absolute",
              background: "var(--Text, #020203)",
            }}
          />
        </div>

    </button>
  );
}

export default ButtonSecondary;
