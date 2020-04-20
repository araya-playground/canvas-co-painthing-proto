import './styles/main.css';
const $ = document.querySelector.bind(document);
const canvas = $('#canvas') as HTMLCanvasElement;

class CanvasManager {
    private isDrawing = false;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private canvasRect: DOMRect;
    private mousePoint = {x: 0, y: 0}
    private buttonEl: HTMLButtonElement;

    constructor(canvasEl: HTMLCanvasElement) {
        this.canvas = canvasEl;
        this.ctx = canvas.getContext('2d')!;
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 4;
        this.canvasRect = this.canvas.getBoundingClientRect();
        this.buttonEl = $('#clear') as HTMLButtonElement;
    }

    activate() {
        this.canvas.addEventListener('mousedown', ev => {
            this.setMousePoint(ev);
            this.isDrawing = true;
            this.ctx.beginPath();
            this.ctx.moveTo(this.mousePoint.x, this.mousePoint.y);
        })
        this.canvas.addEventListener("mousemove", ev => {
            if (this.isDrawing) {
                this.setMousePoint(ev);
                this.ctx.lineTo(this.mousePoint.x, this.mousePoint.y);
                this.ctx.stroke();
            }
        })
        this.canvas.addEventListener("mouseup", ev => {
            this.setMousePoint(ev);
            this.isDrawing = false;
        })
        this.canvas.addEventListener("mouseleave", ev => {
            this.isDrawing = false;
        })
        this.buttonEl.addEventListener("click", ev => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        })
    }
    private setMousePoint(ev: MouseEvent) {
        this.mousePoint = {
            x: ev.clientX - this.canvasRect.left,
            y: ev.clientY - this.canvasRect.top
        }
    }
}

const canvasManager = new CanvasManager(canvas);
canvasManager.activate();
