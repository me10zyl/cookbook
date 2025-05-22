import ClipboardJS from 'clipboard';
import {showError, showSuccess} from "./messageService.ts";

function copyText(text) {
    // 创建一个临时按钮
    const fakeBtn = document.createElement('button');
    document.body.appendChild(fakeBtn);

    // 初始化 clipboard 实例
    const clipboard = new ClipboardJS(fakeBtn, {
        text: () => text
    });

    // 监听成功/失败
    clipboard.on('success', function(e) {
        showSuccess('复制成功');
        e.clearSelection();
        clipboard.destroy();
        document.body.removeChild(fakeBtn);
    });

    clipboard.on('error', function(e) {
        showError('复制失败')
        clipboard.destroy();
        document.body.removeChild(fakeBtn);
    });

    // 模拟点击按钮以触发复制
    fakeBtn.click();
}

export default copyText;