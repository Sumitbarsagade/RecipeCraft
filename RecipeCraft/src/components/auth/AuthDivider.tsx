export default function AuthDivider() {
  return (
    <div className="flex items-center py-2">
      <div className="h-px flex-1 bg-gray-200" />

      <span className="px-4 text-sm text-gray-400">
        OR
      </span>

      <div className="h-px flex-1 bg-gray-200" />
    </div>
  );
}