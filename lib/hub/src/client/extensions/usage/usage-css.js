/**
 * 用量扩展的样式装载。
 *
 * hub 的 client 半边只有**一份 bundle**（一个包一份 client 产物），所以样式
 * 也集中注入 —— 每个扩展一个 `<style data-plugin-css="...">` 标签，
 * 命名空间用扩展自己的前缀（本扩展为 `dsu-`），避免与商店核心的 `dps-` 冲突。
 */
import usageCss from './usage.css';
const CSS_KEY = 'dsh-plugin-hub/usage.css';
if (typeof document !== 'undefined' && document.querySelector(`style[data-plugin-css="${CSS_KEY}"]`) === null) {
    const tag = document.createElement('style');
    tag.dataset.plugin = 'dsh-plugin-hub';
    tag.dataset.pluginCss = CSS_KEY;
    tag.textContent = usageCss;
    document.head.appendChild(tag);
}
export { usageCss };
