export function LoadingSpinner({ size = 20, color = "#3d5a73" }: { size?: number; color?: string }) {
  return (
    <span
      style={{
        width: size,
        height: size,
        border: "2px solid #dbe4ee",
        borderTopColor: color,
        borderRadius: "50%",
        display: "inline-block",
        animation: "spin .8s linear infinite",
      }}
    />
  );
}
