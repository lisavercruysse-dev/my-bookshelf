export class StatusResponseDto {
  id: number;
  name: string;
}

export class StatusListResponseDto {
  items: StatusResponseDto[];
}
