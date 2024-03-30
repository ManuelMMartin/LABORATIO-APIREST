export interface MemberEntity {
  id: number;
  login: string;
  avatar_url: string;
}

export interface Character {
  id: number
  name: string
  status: 'Dead' | 'Alive' | 'unknown'
  species: string
  type: string
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown'
  image: string
}

export interface RickEntity<T> {
  info?: {
    count: number
    pages: number
    next: string | null
    prev: string | null
  }
  results?: T
}