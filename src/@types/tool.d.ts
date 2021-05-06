type Tool = {
  name: string;
  caption: string;
  url?: string;
};

type ToolBox = {
  name: string;
  tools: Tool[];
};
