import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';

export function AvatarPage() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>Profile Picture</AvatarFallback>
    </Avatar>
  );
}
