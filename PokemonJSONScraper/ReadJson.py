import csv
import json
import os
import re
def capital_words_spaces(str1):
    try:
        return re.sub(r"(\w)([A-Z])", r"\1 \2", str1)
    except:
        return str1
z=0
for filename in os.listdir("./PokemonJsons"):
    with open("./PokemonJsons/" + filename,"rb") as f:
        data = json.load(f)
        username = data['Username']
        for pokemon in data['Pokemon']:
            z=z+1
            pokemonName = pokemon['Name']
            Move1 = pokemon['Move1']
            Move2 = pokemon['Move2']
            CP = pokemon['CP']
            Level = pokemon['Level']
            Gender = pokemon['Display']['Gender']
            TotalCandy = pokemon['TotalCandy']
            CaughtTime = pokemon['CaughtTimeMs']
            TradeTime = pokemon['TradedTimeMs']
            Move1 = capital_words_spaces(Move1)
            Move2 = capital_words_spaces(Move2)
            d = {"Username":username,"Name":pokemonName,"Move 1":Move1,"Move 2":Move2,"CP":CP,"Level":Level,"Gender":Gender,"Total Candy":TotalCandy,"Caught Time":CaughtTime,"Trade Time":TradeTime}
            fnames = ["Username","Name","Move 1","Move 2","CP","Level","Gender","Total Candy","Caught Time","Trade Time"]
            SheetWriter = open('Pokemon.csv', 'a', newline="")
            with SheetWriter:
                writer= csv.DictWriter(SheetWriter,fieldnames=fnames)
                if z==1:
                    writer.writeheader()
                writer.writerow(d)
            SheetWriter.close()