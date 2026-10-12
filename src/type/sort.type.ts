export type SortOption = "default" | "low" | "high";

export interface SortControlProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}
