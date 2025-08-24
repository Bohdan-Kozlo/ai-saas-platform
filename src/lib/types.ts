export type ActionResponse = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  error?: string;
  data?: Record<string, unknown>;
};

export interface BaseGenerationState {
  success?: boolean;
  error?: string;
  isGenerating?: boolean;
}

export interface ArticleGenerationState extends BaseGenerationState {
  content?: string;
}

export interface BlogTitleGenerationState extends BaseGenerationState {
  titles?: string[];
}

export interface GenerationState<T = unknown> extends BaseGenerationState {
  data?: T;
}

export interface ImageGenerationState extends BaseGenerationState {
  imageUrl?: string;
}
