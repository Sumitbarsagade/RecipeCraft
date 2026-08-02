interface Props {
  title: string;
  links: string[];
}

export default function FooterLink({
  title,
  links,
}: Props) {
  return (
    <div>
      <h3 className="mb-5 font-bold text-white">
        {title}
      </h3>

      <ul className="space-y-3">
        {links.map((item) => (
          <li key={item}>
            <a
              href="#"
              className="text-gray-400 transition hover:text-white"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}