export interface GridifyConfig {
    templatePrefix: string;
    areaPrefix: string;
    defaultUnit: string;
}
export declare const config: GridifyConfig;
declare const _default: (params: Partial<GridifyConfig>) => {
    handler: import("tailwindcss/types/config").PluginCreator;
    config?: Partial<import("tailwindcss/types/config").Config> | undefined;
};
export default _default;
//# sourceMappingURL=index.d.ts.map