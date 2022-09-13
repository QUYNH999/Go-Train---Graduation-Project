import axios from "axios";
import getAllDefaultPrices from "server/src/api/topic/defaultPrice/getAllDefaultPrices";
import DefaultPrice from "server/src/api/topic/defaultPrice/DefaultPrice";

jest.mock("axios")

test('when getAllDefaultPrices is called, it should return new DefaultPrice(200000, 100000)', () => {
    const response = {
        data: {
            "adultPrice": 200000,
            "childPrice": 100000
        }
    }
    axios.get.mockResolvedValue(response);
    getAllDefaultPrices().then(data => expect(data).toEqual(new DefaultPrice(200000, 100000)))
})

test('when getAllDefaultPrices is called, it should not return new DefaultPrice(300000, 50000)', () => {
    const response = {
        data: {
            "adultPrice": 200000,
            "childPrice": 500000
        }
    }

    //Todo: check later
    axios.get.mockResolvedValue(response);
    getAllDefaultPrices().then(data => expect(data).not.toEqual(new DefaultPrice(200000, 100000)))
})
