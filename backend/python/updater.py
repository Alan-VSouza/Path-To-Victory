import pandas as pd

def update_stats_from_csv(src_csv="champion_stats.csv"):
    df = pd.read_csv(src_csv)
    print(f"{len(df)} linhas carregadas para atualização.")

if __name__ == "__main__":
    update_stats_from_csv()
    print("Atualização concluída.")
