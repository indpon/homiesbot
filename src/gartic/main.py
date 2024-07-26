import asyncio
import websockets
import tkinter as tk
from threading import Thread



# Variables storage
user_vars = {}  # to store user variables

root = tk.Tk()
message_text = tk.Text(root)

def clear():
    message_text.delete(1.0, tk.END)

async def handle_message(websocket, path):
    async for msg in websocket:
        message_text.insert(tk.END, f"{msg}\n") if not msg.startswith('Codeprint') or not msg.startswith('Codevar') else None
        if msg.startswith('Codeprint'):
            args = msg.split(' ')
            print(args)
            var_name = args[1]
            user_id = args[2]
            if var_name in user_vars:
                await websocket.send(f"print-rep {user_id} {str(int(eval(user_vars[var_name])))}") if user_vars[var_name].isdigit() else await websocket.send(f"print-rep {user_id} {user_vars[var_name]}")  # Adjusted to use the last argument as user ID
            else:
                await websocket.send(f"print-rep {user_id} {str(eval(args[1]))}") if args[1].isdigit() else await websocket.send(f"print-rep {user_id} {args[1]}")
        elif msg.startswith('Codevar'):
            args = msg.split(' ')
            var_name = args[1]
            var_value = args[2]
            user_vars[var_name] = var_value
            await websocket.send(f"var-rep {var_name} {var_value}")
        elif msg.startswith('Message'):
            await websocket.send(msg)
        elif msg.startswith('clear'):
            clear()
            
async def start_websocket_server():
    start_server = await websockets.serve(handle_message, "127.0.0.1", 8765)
    await start_server.wait_closed()

def start_asyncio_loop():
    asyncio.run(start_websocket_server())

    

def start_tkinter():
    root.geometry("1080x1080")
    root.title("DCP")

    # Create and configure the text widget
    message_text.pack()
    message_text.config(height=50, width=100)

    clear_button = tk.Button(root, text="Clear", command=clear)
    clear_button.pack()

    root.mainloop()

if __name__ == "__main__":
    asyncio_thread = Thread(target=start_asyncio_loop)
    asyncio_thread.start()

    start_tkinter()
